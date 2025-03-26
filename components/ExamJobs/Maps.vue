<template>
    <div>
        <longdo-map @load="loadMap" id="longdo-map" :zoom="13" :lastView="false">
            <longdo-map-marker @add="addMarker" v-for="(item, i) in markers" :key="i" :location="item.location"
                :title="item.title" :detail="item.detail" />
        </longdo-map>
    </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
import { LongdoMapLoad, LongdoMap, LongdoMapMarker } from 'longdo-map-vue'

LongdoMapLoad({
    apiKey: '3ac8f5a841d28b441991bd45c6288356',
})
const markers = ref([
    {
        id: 1,
        location: { lat: 13.7295, lon: 100.5360 },
        title: 'Marker 1',
        detail: 'This is marker 1',
    },
    {
        id: 2,
        location: { lat: 13.7463, lon: 100.5518 },
        title: 'Marker 2',
        detail: 'This is marker 2',
    },
]);
function loadMap(map) {
    map.Layers.setBase(longdo.Layers.NORMAL)
}
function addMarker(marker) {
    console.log(marker.location())
}
</script>

<style scoped>
#longdo-map {
    width: 100%;
    height: 500px;
}
</style>
