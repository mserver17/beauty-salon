<template>
  <section class="location">
    <h2>Наш салон</h2>
    <div id="map"></div>
  </section>
</template>
<script setup>
import { onMounted } from "vue";

const initMap = () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 55.7558, lng: 37.6173 },
    zoom: 15,
  });
  const marker = new google.maps.marker.AdvancedMarkerElement({
    position: { lat: 55.7558, lng: 37.6173 },
    map: map,
    title: "Наш салон",
  });
};
onMounted(() => {
  window.initMap = initMap;
});
</script>
<style scoped>
.location {
  margin-top: 40px;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
