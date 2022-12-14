<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-btn disabled class="mr-2" v-if="current_user">Bienvenido {{current_user.name}}</v-btn>
        <v-btn outlined color="green" class="mr-2" :to="{ name: 'login' }" v-if="!current_user">Iniciar sesión</v-btn>
        <v-btn outlined color="cyan" class="ml-2" :to="{ name: 'register' }" v-if="!current_user">Crear cuenta</v-btn>
        <v-btn outlined color="red" class="ml-2" @click="logout" :to="{ name: 'login' }" v-if="current_user">Salir
        </v-btn>

        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list-item :to="{ name: 'home' }" link>
                <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
               </v-list-item-icon>
             <v-list-item-content>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="current_user" :to="{ name: 'add-libro' }" link>
            <v-list-item-icon>
              <v-icon>mdi-note-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Agregar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'about' }" link>
            <v-list-item-icon>
              <v-icon>mdi-help-box</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Acerca de</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'calificar' }" link v-if="current_user" >
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content v-if="current_user">
              <v-list-item-title>Calificanos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg" >
            <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import front from '../front';
import USER_API from './api/usuario';

export default {
  data: () => ({
    drawer: null,
    current_user: null,
  }),
  props: {
    source: String,
  },
  mounted() {
    this.getUser();
    this.listenEvents();
  },
  methods: {
    listenEvents() {
      front.$on('refreshUser', () => {
        this.getUser();
      });
    },
    async getUser() {
      return axios({
        method: 'get',
        url: '/api/current_user',
      })
        .then((res) => {
          this.current_user = res.data.current_user;
          localStorage.setItem('usr', this.current_user.email);
        })
        .catch(() => {
        });
    },
    async logout() {
      await USER_API.logout();
    }
  },
}
</script>