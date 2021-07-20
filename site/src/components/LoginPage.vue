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
                    color="#152D56"
                    max-width="500"
                    :loading="loading"
                >
                    <v-col cols="12">
                        <v-form ref="form">
                            <v-dialog
                                v-model="forgotPasswordDialog"
                                persistent
                                dark
                                :internal-activator="true"
                            >
                                <v-card
                                    width="300"
                                    height="210"
                                    class="mx-auto"
                                >
                                    <v-card-title>
                                        Password Reset
                                    </v-card-title>
                                    <v-col>
                                        <v-text-field
                                            label="Username"
                                            v-model="usernameInputReset"
                                            :rules="[rules.required]"
                                            dark
                                            :error="usernameError"
                                            :error-messages="
                                                usernameErrorMessages
                                            "
                                        ></v-text-field>
                                    </v-col>
                                    <v-card-actions>
                                        <v-btn
                                            v-on:click="
                                                forgotPasswordDialog = false
                                            "
                                            class="mx-auto"
                                            color="#DA3B24"
                                            >Cancel</v-btn
                                        >
                                        <v-btn
                                            class="mx-auto"
                                            color="#03B8E9"
                                            v-on:click="submitForgotPassword()"
                                            >Submit</v-btn
                                        >
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

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
                                dark
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                :rules="[rules.required]"
                                v-model="passwordInput"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'"
                                @click:append="show1 = !show1"
                                dark
                            ></v-text-field>
                        </v-form>
                    </v-col>
                    <v-row>
                        <label class="mx-auto" id="loginError"></label>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn
                                class="mx-auto"
                                to="/register"
                                color="#DA3B24"
                                >Sign Up</v-btn
                            >
                        </v-col>
                        <v-col>
                            <v-btn
                                class="mx-auto"
                                color="#DA3B24"
                                v-on:click="forgotPasswordDialog = true"
                                >Forgot password</v-btn
                            >
                        </v-col>
                        <v-col>
                            <v-btn
                                class="mx-auto"
                                v-on:click="performLogin"
                                color="#DA3B24"
                                >Login</v-btn
                            >
                        </v-col>
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
    name: 'LoginPage',
    data: () => ({
        loading: false,
        usernameInput: '',
        usernameInputReset: '',
        passwordInput: '',
        show1: false,
        forgotPasswordDialog: false,
        usernameError: false,
        usernameErrorMessages: [],
        rules: {
            required: (value) => !!value || 'Required',
        },
    }),
    methods: {
        performLogin() {
            this.loading = true;
            if (this.$refs.form.validate()) {
                axios
                    .get('http://198.199.67.109:3000/api/login', {
                        params: {
                            username: this.usernameInput,
                            password: this.passwordInput,
                        },
                    })
                    .then((response) => {
                        this.loading = false;
                        console.log(response);
                        if (!response.data.verified) {
                            console.log('not verified');
                            document.getElementById('loginError').innerHTML =
                                'Email not yet verified';
                            document.getElementById(
                                'loginError'
                            ).style.display = 'inline';
                            return;
                        }
                        document.getElementById('loginError').style.display =
                            'none';
                        this.$session.set('sets', response.data.sets);
                        this.$session.set('username', response.data.username);
                        this.$router.push('/sets');
                    })
                    .catch((error) => {
                        this.loading = false;
                        console.log(error);
                        document.getElementById('loginError').style.display =
                            'inline';
                        document.getElementById('loginError').innerHTML =
                            'Invalid Username or Password';
                    });
            } else {
                this.loading = false;
            }
        },
        submitForgotPassword() {
            if (this.usernameInputReset != '') {
                this.usernameErrorMessages = [];
                axios
                    .get('http://198.199.67.109:3000/api/email', {
                        params: {
                            username: this.usernameInputReset,
                        },
                    })
                    .then((response) => {
                        console.log(response);
                        this.usernameError = false;
                        const email = response.data.email;
                        emailjs.send(
                            'dream5Team',
                            'template_8kxjp6j',
                            {
                                username: this.usernameInputReset,
                                to: email,
                            },
                            'user_K6vGRZGvw7nrh6PmSSw3N'
                        );
                        this.forgotPasswordDialog = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.usernameErrorMessages = ['User does not exist'];
                        this.usernameError = true;
                    });
            }
        },
    },
    mounted() {
        document.getElementById('loginError').style.display = 'none';
        document.getElementById('resetError').style.display = 'none';
        this.$session.clear();
    },
};
</script>
