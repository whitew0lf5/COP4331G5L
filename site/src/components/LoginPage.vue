<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-img
                    :src="require('../assets/pokemonlogo.svg')"
                    class="my-3"
                    contain
                    height="200"
                />
            </v-col>

            <v-col>
                <v-card
                    outline
                    class="mx-auto my-12"
                    color="#DA3B24"
                    max-width="500">
                    <v-form ref="form">
                        <v-text-field label="Username" v-model="usernameInput"></v-text-field>
                        <v-text-field label="Password" v-model="passwordInput"></v-text-field>
                    </v-form>
                    <v-row>
                        <label class="mx-auto" id="loginError">Invalid Username or Password</label>
                    </v-row>
                    <v-row>
                        <v-btn class="mx-auto">Sign Up</v-btn>
                        <v-btn class="mx-auto" v-on:click="performLogin">Login</v-btn>
                    </v-row>
                    <a href="https://www.xbox.com/en-US/" target="_blank">Forgot password</a>
                </v-card>

            </v-col>


        </v-row>
    </v-container>
</template>

<script>
const axios = require('axios').default;

// const fs = require('fs')
export default {
    name: 'LoginPage',
    data: () => ({
      usernameInput: '',
      passwordInput: '',
    }),
    methods: {
      performLogin () {
        axios.get('http://198.199.67.109:5000/api/login', {
            params: {
                username: this.usernameInput,
                password: this.passwordInput
            }
        })
        .then(function (response) {
            console.log(response)
            document.getElementById("loginError").style.display = "none"
            window.location.href = 'https://www.xbox.com/en-US/'
        })
        .catch(function (error) {
            console.log(error)
            document.getElementById("loginError").style.display = "inline"
        })
        .then(function () {
            document.getElementById("loginError").style.display = "inline"
        })
      }
    },
    mounted() {
        document.getElementById("loginError").style.display = "none"
    }
};
</script>
