<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="libro in libros" :key="libro._id">
        <v-card class="pa-1" :to="{ name: 'libro', params: { id: libro._id } }">
          <v-img height="250" :src="`/${libro.image}`"></v-img>
          <v-card-title class="headline">
            <h5>{{ libro.category }}</h5>
          </v-card-title>
          <v-card-title class="headline">
            {{ libro.title }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ libro.content.substring(0, 40) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from '../api/libro';

export default {
  name: 'Home',
  data() {
    return {
    libros: [],
    };
  },
  async created() {
    this.libros = await API. obtenerLibros();
  }
};
</script>
