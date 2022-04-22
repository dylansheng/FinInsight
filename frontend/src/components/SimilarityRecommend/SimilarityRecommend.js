import dataService from '../../service/dataService.js'
import pipeService from '../../service/pipeService.js';
import * as d3 from 'd3'
import $ from 'jquery'

export default {
	name: 'SimilarityRecommend',
	components: {},
	props: {},
	computed: {},
	data() {
		return {
			checkboxGroup1: [],
			selected: [],
			lastcluster: 1,
			lastindex: 493
		}
	},
	watch: {
		checkboxGroup1: function() {
			this.selected = []
			for (let i = 0; i < this.checkboxGroup1.length; i++) {
				let number = this.checkboxGroup1[i].split(' ')[1]
				if (number != 'X') {
					this.selected.push(parseInt(number))
				} else {
					this.selected.push(10)
				}
			}
		},
		selected: function() {
			console.log(this.selected)
			if (this.selected.length == 0) {
				for (let i = 1; i < 11; i++) {
					d3.selectAll('.cluster' + i).style('visibility', 'visible')
				}
			} else {
				for (let i = 1; i < 11; i++) {
					if (this.selected.includes(i)) {
						console.log(i)
						d3.selectAll('.cluster' + i).style('visibility', 'visible')
					} else {
						d3.selectAll('.cluster' + i).style('visibility', 'hidden')
					}
				}
			}
		}
	},
	mounted: function() {
		this.drawSimilarity()
	},
	methods: {
		drawSimilarity() {
			const that = this
			const svg = d3.select("#cluster")
				.append("svg")
				.attr("width", 290)
				.attr("height", 280)
				.append("g")
			const datao = require('../../../../data/similarity.json')
			const data = []
			for (let i = 0; i < datao.length; i++) {
				data.push({
					'x': parseFloat(datao[i].x),
					'y': parseFloat(datao[i].y),
					'cluster': parseInt(datao[i].test_index),
					'index': parseInt(datao[i].train_index)
				})
			}
			const xScale = d3.scaleLinear()
				.range([10, 280])
				.domain([d3.min(data, datum => datum.x), d3.max(data, datum =>
					datum.x)])
			const yScale = d3.scaleLinear()
				.range([10, 250])
				.domain([d3.min(data, datum => datum.y), d3.max(data, datum =>
					datum.y)])

			svg.selectAll()
				.data(data)
				.join("circle")
				.attr('r', 5)
				.attr("cx", function(d) {
					return xScale(d.x)
				})
				.attr("cy", function(d) {
					return yScale(d.y)
				})
				.style("stroke", "#a2d2ff")
				.style("fill", "#f1faee")
				.style("stroke-width", 2)
				.attr("class", function(d) {
					return 'cluster' + d.cluster + ' ' + d.index
				})
				.attr("visibility", 'visible')
				.on("mouseover", function() {
					d3.select(this).style("stroke", "#ee9b00")
				})
				.on("mouseout", function() {
					d3.select(this).style("stroke", "#a2d2ff")
				})
				.on("click", function(){
					let name = d3.select(this)._groups[0][0].className.baseVal
					let cluster = parseInt(name.split(' ')[0].split('r')[1])
					let index = parseInt(name.split(' ')[1])
					that.showFigure(cluster, index)
					d3.selectAll('.cluster' + that.lastcluster).style("fill", "#f1faee")
					d3.select(this).style("fill", "#ee9b00")
					that.lastcluster = cluster
					that.lastindex = index
				})
		},
		showFigure(cluster, index){
			const datao = require('../../../../data/similarity.json')
			const data = []
			for (let i = 0; i < datao.length; i++) {
				if (parseInt(datao[i].test_index) == cluster && parseInt(datao[i].train_index) == index){
					for (let j = 1; j < 31; j++){
						data.push({
							'open': parseFloat(datao[i]['open' + j]),
							'close': parseFloat(datao[i]['close' + j]),
							'high': parseFloat(datao[i]['high' + j]),
							'low': parseFloat(datao[i]['low' + j]),
							'volume': parseFloat(datao[i]['volume' + j]),
						})
					}
					break
				}
			}
			d3.select("#simdisplay").selectAll('*').remove()
			const svg = d3.select("#simdisplay")
				.append("svg")
				.attr("width", 350)
				.attr("height", 280)
				.append("g")
			
			const xScale = d3.scaleLinear()
				.range([10, 340])
				.domain([1, 30])
			
			const yScale = d3.scaleLinear()
				.range([150, 50])
				.domain([d3.min(data, datum => datum.low), d3.max(data, datum =>
					datum.high)])
			
			const barScale = d3.scaleLinear()
				.range([0, 100])
				.domain([0, d3.max(data, datum =>
					datum.volume)])
			
			for (let i = 0; i < data.length; i++) {
				let xg = svg.append('g')
					.attr("width", 300)
					.attr("height", 280)
			
				let color = 'green'
				if (data[i]['open'] > data[i]['close']) {
					color = '#e63946'
				}
				xg.append("line")
					.attr("x1", xScale(i))
					.attr("y1", yScale(data[i]['low']))
					.attr("x2", xScale(i))
					.attr("y2", yScale(data[i]['high']))
					.attr('stroke-width', 1)
					.attr('stroke', color)
			
				xg.append("line")
					.attr("x1", xScale(i))
					.attr("y1", yScale(data[i]['open']))
					.attr("x2", xScale(i))
					.attr("y2", yScale(data[i]['close']))
					.attr('stroke-width', 5)
					.attr('stroke', color)
			
			}
			for (let i = 0; i < data.length; i++) {
				let xg = svg.append('g')
					.attr("width", 300)
					.attr("height", 280)
			
				xg.append('rect')
					.attr("x", xScale(i))
					.attr("y", 290 - barScale(data[i]['volume']))
					.attr("width", 8)
					.attr("height", barScale(data[i]['volume']))
					.attr('fill', "#afb3b1")
			}
		}
	}
}
