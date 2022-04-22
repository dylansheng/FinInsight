import dataService from '../../service/dataService.js'
import pipeService from '../../service/pipeService.js'
import * as d3lasso from 'd3-lasso'
import * as d3 from 'd3'
import $ from 'jquery'

export default {
	name: 'ControlPanel',
	components: {},
	props: {},
	computed: {},
	data() {
		return {
			highlight: [[], [], [], [], [], [], [], [], [], []],
			control: 0,
			flag: true
		}
	},
	watch: {
		flag: function() {
			this.drawHighlight(this.control)
		},
		control: function() {
			pipeService.emitIndex(this.control)
			this.drawFig(this.control, 1)
			this.drawHighlight(this.control)
			for (let i = 1; i < 11; i++){
				if (i != this.control){
					d3.select('#border' + i).style('stroke', '#b0b0b0')
				}else{
					d3.select('#border' + this.control).style('stroke', 'black')
				}
			}
		}
	},
	mounted: function() {
			
		this.drawFig(this.control, 1)
		this.drawThumbnail()
		
	},
	methods: {
		drawThumbnail() {
			const that = this
			for(let i = 1; i < 11; i++){
				let savesvg = d3.select("#save")
					.append("svg")
					.attr("width", 125)
					.attr("height", 87)
					.append("g")
					.attr("transform", "translate(3,5)")
				
				savesvg.append('rect')
					.attr("x", 1)
					.attr("y", 1)
					.attr("width", 120)
					.attr("height", 80)
					.attr('fill', "white")
					.attr('stroke', "#b0b0b0")
					.attr('id', function(){
						return 'border' + i
					})
					.on("click", function(){
						that.control = i
					})
				
				this.drawThumbnailFig(i, savesvg, 0.2)
			}		
		},
		drawThumbnailFig(index, svg, p){
			const data_o = require('../../../../data/test.json')
			const data = []
			for (let i = 0; i < data_o.length; i++) {
				if (index == parseFloat(data_o[i]['index']))
				{
					data.push({
						'open': parseFloat(data_o[i]['open']),
						'high': parseFloat(data_o[i]['high']),
						'low': parseFloat(data_o[i]['low']),
						'close': parseFloat(data_o[i]['close']),
						'volume': parseFloat(data_o[i]['volume'])
					})
				}
			}
			svg.append("text")
				.attr("x", 5)
				.attr("y", 15)
				.attr("fill", 'black')
				.attr("font-size", 17)
				.text(index)
				.style("font-family", "Georgia")
				
			const xScale = d3.scaleLinear()
				.range([50 * p, 580 * p])
				.domain([1, 30])
			
			const yScale = d3.scaleLinear()
				.range([300 * p, 10 * p])
				.domain([d3.min(data, datum => datum.low), d3.max(data, datum =>
					datum.high)])
			
			const barScale = d3.scaleLinear()
				.range([0, 90 * p])
				.domain([0, d3.max(data, datum =>
					datum.volume)])
			
			for (let i = 0; i < data.length; i++) {
				let xg = svg.append('g')
					.attr("width", 500 * p)
					.attr("height", 397 * p)

				let color = 'green'
				if (data[i]['open'] > data[i]['close']) {
					color = '#e63946'
				}

				let linewidth = 2 * p
				
				xg.append("line")
					.attr("x1", xScale(i) + 6 * p)
					.attr("y1", yScale(data[i]['low']))
					.attr("x2", xScale(i) + 6 * p)
					.attr("y2", yScale(data[i]['high']))
					.attr('stroke-width', 4 * p)
					.attr('stroke', color)
				
				xg.append("line")
					.attr("x1", xScale(i) + 6 * p)
					.attr("y1", yScale(data[i]['open']))
					.attr("x2", xScale(i) + 6 * p)
					.attr("y2", yScale(data[i]['close']))
					.attr('stroke-width', 12 * p)
					.attr('stroke', color)
					
				xg.append('rect')
					.attr("x",xScale(i))
					.attr("y", 397 * p - barScale(data[i]['volume']))
					.attr("width", 10 * p)
					.attr("height", barScale(data[i]['volume']))
					.attr('fill', "#afb3b1")
			}
			
		},
		drawFig(index, p) {
			d3.select("#control").selectAll('*').remove()
			
			const svg = d3.select("#control")
				.append("svg")
				.attr("width", 610)
				.attr("height", 397)
				.append("g")
				
			const that = this
			const data_o = require('../../../../data/test.json')
			const data = []
			for (let i = 0; i < data_o.length; i++) {
				if (index == parseFloat(data_o[i]['index']))
				{
					data.push({
						'open': parseFloat(data_o[i]['open']),
						'high': parseFloat(data_o[i]['high']),
						'low': parseFloat(data_o[i]['low']),
						'close': parseFloat(data_o[i]['close']),
						'volume': parseFloat(data_o[i]['volume'])
					})
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
			
			// **********************************lasso definition**********************************
			var lasso_start = function() {
				lasso.items()
					.classed("not_possible", true)
					.classed("selected", false)
			}
			
			var lasso_draw = function() {
				lasso.possibleItems()
					.classed("not_possible", false)
					.classed("possible", true)
				lasso.notPossibleItems()
					.classed("not_possible", true)
					.classed("possible", false)
			
			}
			
			var lasso_end = function() {
				lasso.items()
					.classed("not_possible", false)
					.classed("possible", false)
				lasso.selectedItems()
					.classed("selected", true)
				let selected = lasso.selectedItems()._groups[0]
				let highlight_new = []
				for (let i = 0; i < selected.length; i++) {
					let ele = selected[i]
					let mark = parseInt(ele["className"].baseVal.split(' ')[1])
					highlight_new.push(mark)
				}
				let temp = [].concat(that.highlight[index - 1])
				for (let i = 0; i < highlight_new.length; i++){
					if (temp.includes(highlight_new[i])) {
						temp.remove(highlight_new[i])
					} else {
						temp.push(highlight_new[i])
					}
				}
				that.highlight[index - 1] =  [].concat(temp)
				that.flag = !that.flag
			}
			// ************************************************************************************

			for (let i = 0; i < data.length; i++) {
				let xg = svg.append('g')
					.attr("width", 500 * p)
					.attr("height", 397 * p)
					.attr("class", function() {
						return "tag " + i
					})
					.on("click", function() {
						that.flag = !that.flag
						if (that.highlight[index - 1].includes(i)) {
							that.highlight[index - 1].remove(i)
						} else {
							that.highlight[index - 1].push(i)
						}
					})

				let color = 'green'
				if (data[i]['open'] > data[i]['close']) {
					color = '#e63946'
				}

				xg.append('rect')
					.attr("x", xScale(i) + 5)
					.attr("y", yScale(data[i]['high']))
					.attr("width", 2 * p)
					.attr("height", yScale(data[i]['low']) - yScale(data[i]['high']))
					.attr('fill', color)
					.attr("id", function() {
						return "line1" + i
					})
				
				var lower = yScale(data[i]['open'])
				
				if(yScale(data[i]['open']) > yScale(data[i]['close'])){
					lower = yScale(data[i]['close'])
				}
				
				xg.append('rect')
					.attr("x", xScale(i) + 1)
					.attr("y", lower)
					.attr("width", 10 * p)
					.attr("height", Math.abs(yScale(data[i]['open']) - yScale(data[i]['close'])))
					.attr('fill', color)
					.attr("id", function() {
						return "line2" + i
					})
				

			}
			for (let i = 0; i < data.length; i++) {
				let xg = svg.append('g')
					.attr("width", 500 *p)
					.attr("height", 397 * p)
					.attr("class", function() {
						return "bar " + i
					})
					.on("click", function() {
						that.flag = !that.flag
						if (that.highlight[index - 1].includes(i)) {
							that.highlight[index - 1].remove(i)
						} else {
							that.highlight[index - 1].push(i)
						}
					})
					
				xg.append('rect')
					.attr("x", xScale(i))
					.attr("y", 397 * p - barScale(data[i]['volume']))
					.attr("width", 12 * p)
					.attr("height", barScale(data[i]['volume']))
					.attr('fill', "#afb3b1")
					.attr("id", function() {
						return "bar" + i
					})
			}
			var nodes = d3.selectAll('.tag')
			const lasso = d3lasso.lasso()
				.closePathDistance(50)
				.closePathSelect(true)
				.targetArea(d3.select('#control'))
				.items(nodes)
				.on("start", lasso_start)
				.on("draw", lasso_draw)
				.on("end", lasso_end)
			svg.call(lasso)
			
		},
		drawHighlight(index) {
			for (let i = 0; i < 30; i++) {
				if (this.highlight[index - 1].includes(i)) {
					d3.select('#line1' + i).style('stroke', '#ee9b00')
					d3.select('#line2' + i).style('stroke', '#ee9b00')
					d3.select('#bar' + i).style('fill', '#ee9b00')
				} else {
					d3.select('#line1' + i).style('stroke', 'none')
					d3.select('#line2' + i).style('stroke', 'none')
					d3.select('#bar' + i).style('fill', '#afb3b1')
				}
			}
		}
	}
}
