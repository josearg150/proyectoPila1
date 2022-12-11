<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="pa-4" mx-auto>
                <v-card class="pa-2">
                    <v-img :src="`/${post.image}`"></v-img>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="2">
                                {{ post.category }}
                            </v-col>
                            <v-col sm="10" class="d-flex justify-end">
                                <v-btn v-if="author" color="success" text :to="{ name: 'edit-post', params: { id: post._id } }">Editar
                                </v-btn>
                                <v-btn v-if="author" color="red" text @click="removePost(post._id)">Eliminar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline">
                        <h3>{{ post.title }}</h3>
                    </v-card-subtitle>
                    <v-card-subtitle class="headline">
                        <h5>Autor: {{ post.autor }}</h5>
                    </v-card-subtitle>
                    <v-card-text class="grey-text">
                        <p>Reseña: {{ post.content }}</p>
                        <p>Reseña hecha por: {{ post.usr }}</p>
                        <p>Fecha: {{ post.created }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from '../api/libro';

export default {
    data() {
        return {
            author: false,
            post: {},
        };
    },
    async created() {
        const response = await API. getLibroID(this.$route.params.id);
        this.post = response;
        const email = localStorage.getItem('usr');
        if ( email == this.post.usr) {
                this.author = true;
            }
    },
    methods: {
        async removePost(id) {
            const response = await API. deleteLibro(id);
            this.$swal({
                text: `${response.message}`,
            });
            this.$router.push({ name: 'home' });
        },
    },
}
</script>