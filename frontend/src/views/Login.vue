<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5 mt-15">
                    <v-card-title>Iniciar sesión</v-card-title>
                    <v-form v-model="valid" ref="form" class="pa-5" enctype="multipart/form-data">
                        <v-text-field name="email" label="Correo electronico" v-model="email" prepend-icon="mdi-email"
                            :rules="[rules.required, rules.email]" required>
                        </v-text-field>
                        <v-text-field label="Contraseña" v-model="password" prepend-icon="mdi-lock"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]"
                            :type="show ? 'text' : 'password'" name="password" @click:append="show = !show">
                        </v-text-field>
                        <v-btn @click="send" :disabled="!valid" class="mt-3" color="primary">Ingresar</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        valid: true,
        show: false,
        email: '',
        password: '',
        rules: {
            required: value => !!value || 'Campo obligatorio',
            email: v => /\S+@\S+\.\S+/.test(v) || 'El correo electrónico no es válido',
        },
    }),
    mounted() {
        this.create();
    },
    methods: {
        async create() {
            if (window.localStorage) {
                if (!localStorage.getItem('firstLoad')) {
                    localStorage['firstLoad'] = true;
                    this.$router.go(0);
                }
                else {
                    localStorage.removeItem('firstLoad');
                    localStorage.removeItem('usr');
                }
            }
        },
        async send() {
            return axios({
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password,
                },
                url: '/api/user/login',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    this.$swal({
                        title: 'Sesion iniciada',
                        text: 'Bienvenido ',
                        type: 'Success',
                    });
                    this.$router.push({ name: 'home' });
                    this.$router.go(0);
                })
                .catch((error) => {
                    const message = error.response.data.message;
                    this.$swal({
                        title: 'Error',
                        text: 'El usuario o la contraseña son incorrectos',
                        type: 'error',
                    });
                });
        },
    },
};
</script>
