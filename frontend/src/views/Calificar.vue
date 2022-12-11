<template>
	<v-container>
		<v-card class="pa-5" center>
				<v-card-text v-if="selected == false">
				  <v-hover v-slot:default="{ hover }">
					<v-icon :color="hover || stars >= 1 ? 'orange' : 'grey'" @mouseover="stars = 1"
					  @mouseleave="stars = 0" x-large @click="selectStar(1)">mdi-star</v-icon>
				  </v-hover>
				  <v-hover v-slot:default="{ hover }">
					<v-icon :color="hover || stars >= 2 ? 'orange' : 'grey'" @mouseover="stars = 2"
					  @mouseleave="stars = 0" x-large @click="selectStar(2)">mdi-star</v-icon>
				  </v-hover>
				  <v-hover v-slot:default="{ hover }">
					<v-icon :color="hover || stars >= 3 ? 'orange' : 'grey'" @mouseover="stars = 3"
					  @mouseleave="stars = 0" x-large @click="selectStar(3)">mdi-star</v-icon>
				  </v-hover>
				  <v-hover v-slot:default="{ hover }">
					<v-icon :color="hover || stars >= 4 ? 'orange' : 'grey'" @mouseover="stars = 4"
					  @mouseleave="stars = 0" x-large @click="selectStar(4)">mdi-star</v-icon>
				  </v-hover>
				  <v-hover v-slot:default="{ hover }">
					<v-icon :color="hover || stars >= 5 ? 'orange' : 'grey'" @mouseover="stars = 5"
					  @mouseleave="stars = 0" x-large @click="selectStar(5)">mdi-star</v-icon>
				  </v-hover>
				</v-card-text>
				<v-card-text v-if="selected">
				  <v-icon :color="stars >= 1 ? 'orange' : 'grey'" x-large @click="selected = false">mdi-star</v-icon>
				  <v-icon :color="stars >= 2 ? 'orange' : 'grey'" x-large @click="selected = false">mdi-star</v-icon>
				  <v-icon :color="stars >= 3 ? 'orange' : 'grey'" x-large @click="selected = false">mdi-star</v-icon>
				  <v-icon :color="stars >= 4 ? 'orange' : 'grey'" x-large @click="selected = false">mdi-star</v-icon>
				  <v-icon :color="stars == 5 ? 'orange' : 'grey'" x-large @click="selected = false">mdi-star</v-icon>
				</v-card-text>
				<v-btn class="ml-5" color="blue"  @click="rate">Calificar</v-btn>
			  </v-card>
	</v-container>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
	data() {
	  return {
		stars: 0,
		selected: false,
		logged: false,
		usr: '',
	  }
	},
	async created() {
	  this.selected = this.$store.getters.selectedStar;
	  this.$stars = this.$store.getters.stars;
	  this.logged = localStorage.getItem('usr');
	  this.usr = localStorage.getItem('usr');
	},
	methods: {
	  selectStar(n) {
		this.selected = true;
		this.$store.state.stars = n;
		this.$store.state.starPosition = n;
		this.$store.dispatch('setStarsAction');
		this.$stars = this.$store.getters.stars;
  
	  },
	  async rate() {
		return axios({
		  method: 'put',
		  data: {
			usr: this.usr,
			value: this.stars,
		  },
		  url: '/api/rating/',
		  headers: {
			'Content-Type': 'application/json',
		  },
		}).then(() => {
		  this.$swal({
			title: '¡Gracias por calificar!',
			type: 'Success',
		  });
		})
		  .catch((err) => {
			this.$swal({
			  title: 'Error',
			  text: 'Ocurrio un error',
			  type: 'error',
			});
		  });
	  }
	}
  }
  </script>