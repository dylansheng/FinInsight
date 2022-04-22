<template src='./ControlPanel.html'></template>
<script src='./ControlPanel.js'></script>

<style>
	#controlpanel {
		border: 1px solid lightgray;
		border-radius: 5px;
	}

	#control {
		border: 0.5px solid lightgray;
		border-radius: 5px;
		min-height: 400px;
	}

	#save {
		overflow-x: hidden;
		overflow-y: scroll;
		height: 352px;
	}
	
	#ssubmit {
		border: 0.5px solid lightgray;
		border-radius: 5px;
		min-height: 400px;
	}

	.lasso path {
		stroke: rgb(80, 80, 80);
		stroke-width: 5px;
	}

	.lasso .drawn {
		fill: #3399FF;
		fill-opacity: 0.1;
	}

	.lasso .loop_close {
		fill: none;
		stroke-dasharray: 4, 4;
	}

	.lasso .origin {
		fill: #3399FF;
		fill-opacity: .5;
	}

	.not_possible {
		fill: rgb(200, 200, 200);
	}

	.possible {
		fill: #EC888C;
	}

	.selected {
		font-family: "Arial";
	}
</style>
