<template>
	<div class="d-model">
		<model-fbx
			:src="options.src"
			@load="onLoad"
    	:backgroundColor="options.backgroundColor"
			:cameraPosition="options.cameraPosition"
			:position="options.position"
			:lights="options.lights"
			:rotation="options.rotation"
			@click="handleClick"
			/>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ModelFbx } from 'vue-3d-model';
const options = reactive({
	src: '/src/assets/static/huochezhan/huochezhan.FBX',
	backgroundColor: '#1e1e1e' as unknown as number,
	cameraPosition: { x: 60, y: 60, z: 0 },
	rotation: {
		x: 0,
		y: -Math.PI / 4,
		z: 0,
	},
	position: {
		x: 0,
		y: 0,
		z: 0,
	},
	lights: [
		{
			type: 'HemisphereLight',
			position: { x: 0, y: 1, z: 0 },
			color: 0xffffff,
			intensity: 1,
		},
		{
			type: 'DirectionalLight',
			position: { x: 1, y: 1, z: 1 },
			color: '#ffffff',
			intensity: 0.8
		}
	],
});

const onLoad = () => {
	console.log('onLoad')
	// rotate();
};
let object: any = null
let colorMap = new Map();
const handleClick = (event: any, intersected: any) => {
	console.log(event, intersected, 39);
	
	if (object) {
    // object.material.color.setStyle('#fff');
		object.material.color.setStyle(colorMap.get(object.uuid));
  }

  if (intersected) {
    object = intersected.object;
		const color = object.material.color.getStyle();
		console.log(color, 48);
		colorMap.set(object.uuid, color);
    object.material.color.setStyle('red');
  }
};

const rotate = () => {
	requestAnimationFrame(rotate);
  options.rotation.z += 0.01;
}
</script>

<style lang="scss" scoped>
.d-model {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
	.model-fbx {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
}
</style>