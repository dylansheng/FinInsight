import dataService from '../../service/dataService.js'
import pipeService from '../../service/pipeService.js';
import * as d3 from 'd3'
import $ from 'jquery'

export default {
	name: 'Result',
	components: {},
	props: {},
	computed: {},
	data() {
		return {
			index: -1,
			importance: [],
			prediction: [0.002095012, 0.002096025, 0.002486735, -0.000455868, 0.002251078, 0.000232103, 0.002889472,
				0.001016224, 0.003911497, 0.003207657
			]
		}
	},
	watch: {
		index: function() {
			this.drawFig(this.index, 1)
		}
	},
	mounted: function() {
		const that = this
		pipeService.onIndex(function(msg) {
			that.index = msg
		})
	},
	methods: {
		drawFig(index, p) {
			d3.select("#figure").selectAll('*').remove()
			const svg = d3.select("#figure")
				.append("svg")
				.attr("width", 610)
				.attr("height", 397)
				.append("g")

			const that = this
			const data_o = require('../../../../data/test.json')
			const data = []
			const data2 = []
			for (let i = 0; i < data_o.length; i++) {
				if (index == parseFloat(data_o[i]['index'])) {
					data.push({
							'open': parseFloat(data_o[i]['open']),
							'high': parseFloat(data_o[i]['high']),
							'low': parseFloat(data_o[i]['low']),
							'close': parseFloat(data_o[i]['close']),
							'volume': parseFloat(data_o[i]['volume'])
						}),
						data2.push(parseFloat(data_o[i]['close']))
				}
			}

			const xScale = d3.scaleLinear()
				.range([50 * p, 580 * p])
				.domain([1, 30])

			const yScale = d3.scaleLinear()
				.range([200 * p, 10 * p])
				.domain([d3.min(data, datum => datum.low), d3.max(data, datum =>
					datum.high)])

			const barScale = d3.scaleLinear()
				.range([0, 170 * p])
				.domain([0, d3.max(data, datum =>
					datum.volume)])

			Array.prototype.indexOf = function(val) {
				for (var i = 0; i < this.length; i++) {
					if (this[i] == val) return i
				}
				return -1
			}

			Array.prototype.remove = function(val) {
				let index = this.indexOf(val)
				if (index > -1) {
					this.splice(index, 1)
				}
			}

			for (let i = 0; i < data.length; i++) {
				let xg = svg.append('g')
					.attr("width", 500 * p)
					.attr("height", 397 * p)

				let color = 'green'
				if (data[i]['open'] > data[i]['close']) {
					color = '#e63946'
				}

				xg.append("line")
					.attr("x1", xScale(i) + 6)
					.attr("y1", yScale(data[i]['low']))
					.attr("x2", xScale(i) + 6)
					.attr("y2", yScale(data[i]['high']))
					.attr('stroke-width', 2)
					.attr('stroke', color)

				xg.append("line")
					.attr("x1", xScale(i) + 6)
					.attr("y1", yScale(data[i]['open']))
					.attr("x2", xScale(i) + 6)
					.attr("y2", yScale(data[i]['close']))
					.attr('stroke-width', 12)
					.attr('stroke', color)

			}
			for (let i = 0; i < data.length; i++) {
				let xg = svg.append('g')
					.attr("width", 500 * p)
					.attr("height", 397 * p)

				xg.append('rect')
					.attr("x", xScale(i))
					.attr("y", 397 * p - barScale(data[i]['volume']))
					.attr("width", 12 * p)
					.attr("height", barScale(data[i]['volume']))
					.attr('fill', "#afb3b1")
			}


			d3.select("#panel").selectAll('*').remove()
			const svg2 = d3.select("#panel")
				.append("svg")
				.attr("width", 180)
				.attr("height", 400)
				.append("g")
				.attr('transform', `translate(0, 20)`)

			svg2.append("text")
				.attr("x", 55)
				.attr("y", 10)
				.attr("fill", 'black')
				.attr("font-size", 20)
				.text('close')
				.style("font-family", "Georgia")

			const y2 = d3.scaleLinear()
				.domain([d3.min(data2), d3.max(data2) + 100])
				.range([20, 200])

			const histogram = d3.histogram()
				.domain([d3.min(data2), d3.max(data2)])
				.thresholds(y2.ticks(20))

			const bins = histogram(data2)

			const x2 = d3.scaleLinear()
				.domain([0, d3.max(bins, d => d.length)])
				.range([0, 100])

			svg2.append('g')
				.attr('transform', `translate(50, 200)`)
				.call(d3.axisBottom(x2).ticks(5))

			svg2.append('g')
				.attr('transform', `translate(50, 0)`)
				.call(d3.axisLeft(y2))

			svg2.append('g')
				.selectAll('rect')
				.data(bins)
				.enter()
				.append('g')
				.append('rect')
				.attr('x', 51)
				.attr('y', d => y2(d.x0))
				.attr('width', d => x2(d.length))
				.attr('height', 5)
				.attr('fill', '#afb3b1')

			svg2.append("text")
				.attr("x", 40)
				.attr("y", 280)
				.attr("fill", 'black')
				.attr("font-size", 20)
				.text('prediction')
				.style("font-family", "Georgia")

			svg2.append('rect')
				.attr("x", 20)
				.attr("y", 300)
				.attr("width", 130)
				.attr("height", 30)
				.attr('stroke', "#b3b197")
				.attr('fill', "none")

			svg2.append("text")
				.attr("x", 23)
				.attr("y", 323)
				.attr("fill", 'black')
				.attr("font-size", 20)
				.text(this.prediction[this.index - 1])
				.style("font-style", "italic")
		}
	}
}
