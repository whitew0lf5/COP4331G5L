<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <v-img
                    :src="require('../assets/bulbasaur.png')"
                    contain
                    height="200"
                    class="mr-1"
                />
            </v-col>
            <v-col cols="3">
                <v-img
                    :src="require('../assets/pikachudance.png')"
                    contain
                    height="200"
                    class="mx-1"
                />
            </v-col>
            <v-col cols="3">
                <v-img
                    :src="require('../assets/squirtle.png')"
                    contain
                    height="200"
                    class="mx-1"
                />
            </v-col>
            <v-col cols="3">
                <v-img
                    :src="require('../assets/charmander.png')"
                    contain
                    height="200"
                    class="ml-0"
                />
            </v-col>
            <v-col>
                <v-card
                    outline
                    class="mx-auto my-12"
                    color="#152D56"
                    max-width="500"
                    :loading="loading"
                >
                    <template slot="progress">
                        <v-progress-linear
                            color="blue"
                            height="10"
                            indeterminate
                        ></v-progress-linear>
                    </template>

                    <v-form ref="form">
                        <v-text-field
                            label="Username"
                            v-model="usernameInput"
                            :rules="[rules.required]"
                            dark
                        ></v-text-field>
                        <v-text-field
                            label="Email"
                            v-model="emailInput"
                            :rules="[rules.required, rules.email]"
                            dark
                        >
                        </v-text-field>
                        <v-text-field
                            label="Enter Your Password"
                            v-model="passwordInput1"
                            :rules="[rules.required, rules.min]"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            hint="At least 8 characters"
                            @click:append="show1 = !show1"
                            dark
                        ></v-text-field>
                        <v-text-field
                            label="Enter Your Password Again"
                            v-model="passwordInput2"
                            :rules="[rules.required, rules.min]"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            hint="At least 8 characters"
                            @click:append="show2 = !show2"
                            dark
                        ></v-text-field>
                    </v-form>
                    <v-row>
                        <label class="mx-auto" id="registerError"></label>
                    </v-row>
                    <v-row>
                        <v-btn class="mx-auto" to="/" color="#DA3B24"
                            >Cancel</v-btn
                        >
                        <v-btn
                            class="mx-auto"
                            v-on:click="performRegistration"
                            color="#DA3B24"
                            >Submit</v-btn
                        >
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
const axios = require('axios').default;
import emailjs from 'emailjs-com';
export default {
    name: 'RegisterPage',
    data: () => ({
        loading: false,
        usernameInput: '',
        emailInput: '',
        passwordInput1: '',
        passwordInput2: '',
        show1: false,
        show2: false,
        rules: {
            required: (value) => !!value || 'Required',
            min: (v) => v.length >= 8 || 'Minimum of 8 characters',
            email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        },
    }),
    methods: {
        performRegistration() {
            this.loading = true;
            document.getElementById('registerError').innerHTML = '';
            document.getElementById('registerError').style.display = 'none';
            if (this.$refs.form.validate()) {
                if (this.passwordInput1 !== this.passwordInput2) {
                    this.loading = false;
                    document.getElementById('registerError').innerHTML =
                        'Both password fields must match';
                    document.getElementById('registerError').style.display =
                        'inline';
                    return;
                }
                if (this.usernameInput === '') {
                    this.loading = false;
                    return;
                }
                axios
                    .post('http://198.199.67.109:3000/api/register', null, {
                        params: {
                            username: this.usernameInput,
                            email: this.emailInput,
                            password: this.passwordInput1,
                        },
                    })
                    .then(
                        (response) => {
                            console.log(response);
                            this.loading = false;
                            // Send verification email
                            emailjs.send(
                                'dream5Team',
                                'template_y5so3r9',
                                {
                                    username: this.usernameInput,
                                    to: this.emailInput,
                                },
                                'user_K6vGRZGvw7nrh6PmSSw3N'
                            );

                            console.log(response);
                            this.loading = false;
                            this.$router.push('/');
                        },
                        (error) => {
                            console.log(error);
                            this.loading = false;
                            document.getElementById('registerError').innerHTML =
                                'Username already in use';
                            document.getElementById(
                                'registerError'
                            ).style.display = 'inline';
                        }
                    );
            } else {
                this.loading = false;
            }
        },
    },
    mounted() {
        document.getElementById('registerError').style.display = 'none';
    },
};
</script>
