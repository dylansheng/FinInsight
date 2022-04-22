import dataService from '../../service/dataService.js'
import pipeService from '../../service/pipeService.js';
import * as d3 from 'd3'
export default {
	name: 'Performance',
	components: {},
	props: {},
	computed: {},
	data() {
		return {
			mse1: 0.000428317,
			mse2: -1,
			sharpe1: 0.06,
			sharpe2: -1,
			accuracy1: [11, 195, 18, 295],
			accuracy2: [-1, -1, -1, -1],
		}
	},
	watch: {

	},
	mounted: function() {
		this.obtainDistribution()
		this.mseDisplay()
		this.sharpeDisplay()
		this.accuracyDisplay()
		this.differenceDisplay()
	},
	methods: {
		obtainDistribution() {
			let datao = require('../../../../data/training.json')
			const data = []
			const datap = []
			for (let i = 0; i < datao.length; i++) {
				data.push(parseFloat(datao[i].labels))
				datap.push(parseFloat(datao[i].predictions))
			}
			const svg = d3.select("#distribution")
				.append("svg")
				.attr("width", 700)
				.attr("height", 200)
				.append("g")

			const x = d3.scaleLinear()
				.domain([d3.min(data), d3.max(data)])
				.range([20, 650])

			const histogram = d3.histogram()
				.domain([d3.min(data), d3.max(data)])
				.thresholds(x.ticks(100))

			const bins = histogram(data)

			const y = d3.scaleLinear()
				.domain([0, d3.max(bins, d => d.length)])
				.range([180, 10])

			svg.append('g')
				.attr('transform', `translate(5, ${ 180 })`)
				.call(d3.axisBottom(x))

			svg.append('g')
				.attr('transform', `translate(20, 0)`)
				.call(d3.axisLeft(y))

			svg.append('g')
				.selectAll('rect')
				.data(bins)
				.enter()
				.append('g')
				.append('rect')
				.attr('x', d => x(d.x0) + 1)
				.attr('y', d => y(d.length))
				.attr('width', 7)
				.attr('height', d => 180 - y(d.length))
				.attr('fill', '#afb3b1')
		},
		mseDisplay() {
			const that = this
			const svg = d3.select("#mse")
				.append("svg")
				.attr("width", 400)
				.attr("height", 50)
				.append("g")

			svg.append("text")
				.attr("x", 15)
				.attr("y", 30)
				.attr("fill", 'black')
				.attr("font-size", 20)
				.text('MSE')
				.style("font-family", "Georgia")

			svg.append('rect')
				.attr("x", 80)
				.attr("y", 10)
				.attr("width", 270)
				.attr("height", 30)
				.attr('stroke', "#b3b197")
				.attr('fill', "none")

			//data
			svg.append("text")
				.attr("x", 85)
				.attr("y", 32)
				.attr("fill", 'black')
				.attr("font-size", 20)
				.text(function() {
					if (that.mse1 == -1) {
						return "None"
					} else {
						return that.mse1
					}
				})
				.style("font-style", "italic")

			svg.append("text")
				.attr("x", function() {
					if (that.mse2 == -1) {
						return 250
					} else {
						return 225
					}
				})
				.attr("y", 32)
				.attr("fill", 'black')
				.attr("font-size", 20)
				.text(function() {
					if (that.mse2 == -1) {
						return "None"
					} else {
						return that.mse2
					}
				})
				.style("font-style", "italic")
				.style("text-decoration", "underline")
		},
		sharpeDisplay() {
			const that = this
			const svg = d3.select("#sharpe")
				.append("svg")
				.attr("width", 400)
				.attr("height", 50)
				.append("g")

			svg.append("text")
				.attr("x", 15)
				.attr("y", 30)
				.attr("fill", 'black')
				.attr("font-size", 20)
				.text('sharpe ratio')
				.style("font-family", "Georgia")

			svg.append('rect')
				.attr("x", 150)
				.attr("y", 10)
				.attr("width", 180)
				.attr("height", 30)
				.attr('stroke', "#b3b197")
				.attr('fill', "none")

			//data
			svg.append("text")
				.attr("x", 175)
				.attr("y", 32)
				.attr("fill", 'black')
				.attr("font-size", 20)
				.text(function() {
					if (that.sharpe1 == -1) {
						return "None"
					} else {
						return that.sharpe1
					}
				})
				.style("font-style", "italic")

			svg.append("text")
				.attr("x", 250)
				.attr("y", 32)
				.attr("fill", 'black')
				.attr("font-size", 20)
				.text(function() {
					if (that.sharpe2 == -1) {
						return "None"
					} else {
						return that.sharpe2
					}
				})
				.style("font-style", "italic")
				.style("text-decoration", "underline")
		},
		accuracyDisplay() {
			const that = this
			const svg = d3.select("#accuracy")
				.append("svg")
				.attr("width", 400)
				.attr("height", 150)
				.append("g")

			svg.append("text")
				.attr("x", 15)
				.attr("y", 20)
				.attr("fill", 'black')
				.attr("font-size", 17)
				.text('accuracy')
				.style("font-family", "Georgia")

			//table
			svg.append('rect')
				.attr("x", 20)
				.attr("y", 27)
				.attr("width", 350)
				.attr("height", 112)
				.attr('stroke', "#b3b197")
				.attr('fill', "none")

			svg.append("line")
				.attr("x1", 20)
				.attr("y1", 55)
				.attr("x2", 370)
				.attr("y2", 55)
				.attr('stroke-width', 1)
				.attr('stroke', "#b3b197")

			svg.append("line")
				.attr("x1", 20)
				.attr("y1", 82)
				.attr("x2", 370)
				.attr("y2", 82)
				.attr('stroke-width', 1)
				.attr('stroke', "#b3b197")

			svg.append("line")
				.attr("x1", 20)
				.attr("y1", 109)
				.attr("x2", 370)
				.attr("y2", 109)
				.attr('stroke-width', 1)
				.attr('stroke', "#b3b197")

			svg.append("line")
				.attr("x1", 60)
				.attr("y1", 27)
				.attr("x2", 60)
				.attr("y2", 139)
				.attr('stroke-width', 1)
				.attr('stroke', "#b3b197")

			svg.append("line")
				.attr("x1", 150)
				.attr("y1", 27)
				.attr("x2", 150)
				.attr("y2", 139)
				.attr('stroke-width', 1)
				.attr('stroke', "#b3b197")

			svg.append("line")
				.attr("x1", 240)
				.attr("y1", 27)
				.attr("x2", 240)
				.attr("y2", 139)
				.attr('stroke-width', 1)
				.attr('stroke', "#b3b197")

			//tag	
			svg.append("text")
				.attr("x", 35)
				.attr("y", 70)
				.attr("fill", 'black')
				.attr("font-size", 17)
				.text('n')
				.style("font-family", "Georgia")

			svg.append("text")
				.attr("x", 35)
				.attr("y", 100)
				.attr("fill", 'black')
				.attr("font-size", 17)
				.text('p')
				.style("font-family", "Georgia")

			svg.append("text")
				.attr("x", 30)
				.attr("y", 130)
				.attr("fill", 'black')
				.attr("font-size", 17)
				.text('acc')
				.style("font-family", "Georgia")

			svg.append("text")
				.attr("x", 67)
				.attr("y", 46)
				.attr("fill", 'black')
				.attr("font-size", 17)
				.text('n(predict)')
				.style("font-family", "Georgia")

			svg.append("text")
				.attr("x", 157)
				.attr("y", 46)
				.attr("fill", 'black')
				.attr("font-size", 17)
				.text('p(predict)')
				.style("font-family", "Georgia")

			svg.append("text")
				.attr("x", 295)
				.attr("y", 46)
				.attr("fill", 'black')
				.attr("font-size", 17)
				.text('acc')
				.style("font-family", "Georgia")

			//data
			svg.append("text")
				.attr("x", 75)
				.attr("y", 72)
				.attr("fill", 'black')
				.attr("font-size", 15)
				.text(function() {
					if (that.accuracy1[0] == -1) {
						return "None"
					} else {
						return that.accuracy1[0]
					}
				})
				.style("font-style", "italic")

			svg.append("text")
				.attr("x", 110)
				.attr("y", 72)
				.attr("fill", 'black')
				.attr("font-size", 15)
				.text(function() {
					if (that.accuracy2[0] == -1) {
						return "None"
					} else {
						return that.accuracy2[0]
					}
				})
				.style("font-style", "italic")
				.style("text-decoration", "underline")

			svg.append("text")
				.attr("x", 75)
				.attr("y", 102)
				.attr("fill", 'black')
				.attr("font-size", 15)
				.text(function() {
					if (that.accuracy1[2] == -1) {
						return "None"
					} else {
						return that.accuracy1[2]
					}
				})
				.style("font-style", "italic")

			svg.append("text")
				.attr("x", 110)
				.attr("y", 102)
				.attr("fill", 'black')
				.attr("font-size", 15)
				.text(function() {
					if (that.accuracy2[2] == -1) {
						return "None"
					} else {
						return that.accuracy2[2]
					}
				})
				.style("font-style", "italic")
				.style("text-decoration", "underline")

			svg.append("text")
				.attr("x", 155)
				.attr("y", 72)
				.attr("fill", 'black')
				.attr("font-size", 15)
				.text(function() {
					if (that.accuracy1[1] == -1) {
						return "None"
					} else {
						return that.accuracy1[1]
					}
				})
				.style("font-style", "italic")

			svg.append("text")
				.attr("x", 200)
				.attr("y", 72)
				.attr("fill", 'black')
				.attr("font-size", 15)
				.text(function() {
					if (that.accuracy2[1] == -1) {
						return "None"
					} else {
						return that.accuracy2[1]
					}
				})
				.style("font-style", "italic")
				.style("text-decoration", "underline")

			svg.append("text")
				.attr("x", 155)
				.attr("y", 102)
				.attr("fill", 'black')
				.attr("font-size", 15)
				.text(function() {
					if (that.accuracy1[3] == -1) {
						return "None"
					} else {
						return that.accuracy1[3]
					}
				})
				.style("font-style", "italic")

			svg.append("text")
				.attr("x", 200)
				.attr("y", 102)
				.attr("fill", 'black')
				.attr("font-size", 15)
				.text(function() {
					if (that.accuracy2[3] == -1) {
						return "None"
					} else {
						return that.accuracy2[3]
					}
				})
				.style("font-style", "italic")
				.style("text-decoration", "underline")

			//calculation
			var value11 = -1
			var value12 = -1
			var value13 = -1
			var value14 = -1
			var value15 = -1
			var value21 = -1
			var value22 = -1
			var value23 = -1
			var value24 = -1
			var value25 = -1

			if (this.accuracy1[0] != -1) {
				value11 = ((this.accuracy1[0] / (this.accuracy1[0] + this.accuracy1[2])) * 100).toFixed(2)
				value12 = ((this.accuracy1[3] / (this.accuracy1[1] + this.accuracy1[3])) * 100).toFixed(2)
				value13 = ((this.accuracy1[0] / (this.accuracy1[0] + this.accuracy1[1])) * 100).toFixed(2)
				value14 = ((this.accuracy1[3] / (this.accuracy1[2] + this.accuracy1[3])) * 100).toFixed(2)
				value15 = (((this.accuracy1[0] + this.accuracy1[3]) / (this.accuracy1[0] + this.accuracy1[1] + this
					.accuracy1[2] + this.accuracy1[3])) * 100).toFixed(2)
			}

			if (this.accuracy2[0] != -1) {
				value21 = ((this.accuracy2[0] / (this.accuracy2[0] + this.accuracy2[2])) * 100).toFixed(2)
				value22 = ((this.accuracy2[3] / (this.accuracy2[1] + this.accuracy2[3])) * 100).toFixed(2)
				value23 = ((this.accuracy2[0] / (this.accuracy2[0] + this.accuracy2[1])) * 100).toFixed(2)
				value24 = ((this.accuracy2[3] / (this.accuracy2[2] + this.accuracy2[3])) * 100).toFixed(2)
				value25 = (((this.accuracy2[0] + this.accuracy2[3]) / (this.accuracy2[0] + this.accuracy2[1] + this
					.accuracy2[2] + this.accuracy1[3])) * 100).toFixed(2)
			}

			svg.append("text")
				.attr("x", 61)
				.attr("y", 132)
				.attr("fill", 'black')
				.attr("font-size", 13)
				.text(function() {
					if (value11 == -1) {
						return "None"
					} else {
						return value11 + '%'
					}
				})
				.style("font-style", "italic")

			svg.append("text")
				.attr("x", function() {
					if (value21 == -1) {
						return 110
					} else {
						return 108
					}
				})
				.attr("y", 132)
				.attr("fill", 'black')
				.attr("font-size", function() {
					if (value21 == -1) {
						return 15
					} else {
						return 13
					}
				})
				.text(function() {
					if (value21 == -1) {
						return "None"
					} else {
						return value21 + '%'
					}
				})
				.style("font-style", "italic")
				.style("text-decoration", "underline")

			svg.append("text")
				.attr("x", 151)
				.attr("y", 132)
				.attr("fill", 'black')
				.attr("font-size", 13)
				.text(function() {
					if (value12 == -1) {
						return "None"
					} else {
						return value12 + '%'
					}
				})
				.style("font-style", "italic")

			svg.append("text")
				.attr("x", function() {
					if (value22 == -1) {
						return 200
					} else {
						return 198
					}
				})
				.attr("y", 132)
				.attr("fill", 'black')
				.attr("font-size", function() {
					if (value22 == -1) {
						return 15
					} else {
						return 13
					}
				})
				.text(function() {
					if (value22 == -1) {
						return "None"
					} else {
						return value22 + '%'
					}
				})
				.style("font-style", "italic")
				.style("text-decoration", "underline")

			svg.append("text")
				.attr("x", 260)
				.attr("y", 72)
				.attr("fill", 'black')
				.attr("font-size", 13)
				.text(function() {
					if (value13 == -1) {
						return "None"
					} else {
						return value13 + '%'
					}
				})
				.style("font-style", "italic")

			svg.append("text")
				.attr("x", 320)
				.attr("y", 72)
				.attr("fill", 'black')
				.attr("font-size", function() {
					if (value23 == -1) {
						return 15
					} else {
						return 13
					}
				})
				.text(function() {
					if (value23 == -1) {
						return "None"
					} else {
						return value23 + '%'
					}
				})
				.style("font-style", "italic")
				.style("text-decoration", "underline")

			svg.append("text")
				.attr("x", 260)
				.attr("y", 102)
				.attr("fill", 'black')
				.attr("font-size", 13)
				.text(function() {
					if (value14 == -1) {
						return "None"
					} else {
						return value14 + '%'
					}
				})
				.style("font-style", "italic")

			svg.append("text")
				.attr("x", 320)
				.attr("y", 102)
				.attr("fill", 'black')
				.attr("font-size", function() {
					if (value24 == -1) {
						return 15
					} else {
						return 13
					}
				})
				.text(function() {
					if (value24 == -1) {
						return "None"
					} else {
						return value24 + '%'
					}
				})
				.style("font-style", "italic")
				.style("text-decoration", "underline")

			svg.append("text")
				.attr("x", 260)
				.attr("y", 132)
				.attr("fill", 'black')
				.attr("font-size", 13)
				.text(function() {
					if (value15 == -1) {
						return "None"
					} else {
						return value15 + '%'
					}
				})
				.style("font-style", "italic")

			svg.append("text")
				.attr("x", 320)
				.attr("y", 132)
				.attr("fill", 'black')
				.attr("font-size", function() {
					if (value25 == -1) {
						return 15
					} else {
						return 13
					}
				})
				.text(function() {
					if (value25 == -1) {
						return "None"
					} else {
						return value25 + '%'
					}
				})
				.style("font-style", "italic")
				.style("text-decoration", "underline")

		},
		differenceDisplay() {
			const svg = d3.select("#difference")
				.append("svg")
				.attr("width", 400)
				.attr("height", 150)
				.append("g")

			svg.append("text")
				.attr("x", 15)
				.attr("y", 20)
				.attr("fill", 'black')
				.attr("font-size", 17)
				.text('difference distribution')
				.style("font-family", "Georgia")
			
			let datao = require('../../../../data/training.json')
			const data = []
			for (let i = 0; i < datao.length; i++) {
				data.push(parseFloat(datao[i].labels)-parseFloat(datao[i].predictions))
			}
			
			const x = d3.scaleLinear()
				.domain([d3.min(data), d3.max(data)])
				.range([20, 350])
			
			const histogram = d3.histogram()
				.domain([d3.min(data), d3.max(data)])
				.thresholds(x.ticks(50))
			
			const bins = histogram(data)
			
			const y = d3.scaleLinear()
				.domain([0, d3.max(bins, d => d.length)])
				.range([130, 30])
			
			svg.append('g')
				.attr('transform', `translate(5, 130)`)
				.call(d3.axisBottom(x))
			
			svg.append('g')
				.attr('transform', `translate(40, 0)`)
				.call(d3.axisLeft(y))
			
			svg.append('g')
				.selectAll('rect')
				.data(bins)
				.enter()
				.append('g')
				.append('rect')
				.attr('x', d => x(d.x0) + 1)
				.attr('y', d => y(d.length))
				.attr('width', 9)
				.attr('height', d => 130 - y(d.length))
				.attr('fill', '#afb3b1')
		},
	}

}
