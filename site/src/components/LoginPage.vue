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
                    max-width="500"
                    :loading="loading">
                    <v-form ref="form">

                        <template slot="progress">
                          <v-progress-linear
                            color="blue"
                            height="10"
                            indeterminate
                          ></v-progress-linear>
                        </template>

                        <v-text-field
                            label="Username"
                            v-model="usernameInput"
                            :rules="[rules.required]"
                            ></v-text-field>
                        <v-text-field
                            label="Password"
                            :rules="[rules.required]"
                            v-model="passwordInput"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            ></v-text-field>
                    </v-form>
                    <v-row>
                        <label class="mx-auto" id="loginError">Invalid Username or Password</label>
                    </v-row>
                    <v-row>
                        <v-btn class="mx-auto" to="/register">Sign Up</v-btn>
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
        loading: false,
        usernameInput: '',
        passwordInput: '',
        show1: false,
        rules: {
                required: value => !!value || 'Required',
        }
    }),
    methods: {
      performLogin () {
        this.loading = true
        if (this.$refs.form.validate()) {
            axios.get('http://198.199.67.109:3000/api/login', {
                params: {
                    username: this.usernameInput,
                    password: this.passwordInput
                }
            })
            .then((response) => {
                this.loading = false
                console.log(response)
                document.getElementById("loginError").style.display = "none"
                console.log("Logged In!")
                this.$router.push('/sets');
            })
            .catch((error) => {
                this.loading = false
                console.log(error)
                document.getElementById("loginError").style.display = "inline"
            })
        } else {
            this.loading = false
        }
      }
    },
    mounted() {
        document.getElementById("loginError").style.display = "none"
    }
};
</script>
