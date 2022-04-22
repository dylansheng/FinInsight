<template>
	<div id="app" style="width: 100%">
		<el-container>
			<el-header id="systemHeader">FinInsight</el-header>
			<el-main id="systemMain">
				<el-row>
					<el-col :span="12" style="padding:2px;">
						<Result />
					</el-col>
					<el-col :span="12" style="padding:2px;">
						<ControlPanel />
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12" style="padding:2px;">
						<Performance />
					</el-col>
					<el-col :span="12" style="padding:2px;">
						<SimilarityRecommend />
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	/* global d3 $ _ */
	import ControlPanel from "./components/ControlPanel/ControlPanel.vue"
	import Result from "./components/Result/Result.vue"
	import SimilarityRecommend from "./components/SimilarityRecommend/SimilarityRecommend.vue"
	import Performance from "./components/Performance/Performance.vue"
	
	export default {
		name: "app",
		components: {
			ControlPanel,
			Result,
			SimilarityRecommend,
			Performance
		},
		data() {
			return {

			};
		},
		watch: {},
		mounted: function() {
			console.log("d3: ", d3); /* eslint-disable-line */
			console.log("$: ", $); /* eslint-disable-line */
			console.log("this: ", this, this.components);
			console.log(
				"_",
				_.partition([1, 2, 3, 4], (n) => n % 2)
			); /* eslint-disable-line */
		},
		methods: {

		}
	};
</script>

<style>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 20px;
		margin-left: 15%;
	}

	#systemHeader {
		background-color: #2c3e50;
		color: white;
		text-align: start;
		font-weight: bold;
		font-size: 25px;
		width: 1600px;
		line-height: 60px;
		border-radius: 3px;
		font-family: "Arial";
	}

	#systemMain {
		padding: 5px;
		/* background-color: #E9EEF3; */
		color: #333;
		text-align: center;
		height: 900px;
		width: 1600px;
	}

	.viewheader {
		font-weight: bold;
		text-align: start;
		padding: 5px;
		background: #e5e9f2;
		font-family: "Arial";
	}

	.viewbody {
		height: 400px;
	}
</style>
