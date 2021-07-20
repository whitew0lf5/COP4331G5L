<template>
    <v-container>
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
                width="350"
                height="300"
                class="mx-auto"
                color="#152D56"
                dark
            >
                <v-col>
                    <v-card-title>
                        Reset {{ this.$route.query.username }}'s Password
                    </v-card-title>
                    <v-form ref="form">
                        <v-text-field
                            label="Enter Your New Password"
                            v-model="passwordInput1"
                            :rules="[rules.required, rules.min]"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            hint="At least 8 characters"
                            @click:append="show1 = !show1"
                            dark
                        ></v-text-field>
                        <v-text-field
                            label="Enter Your New Password Again"
                            v-model="passwordInput2"
                            :rules="[rules.required, rules.min]"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            hint="At least 8 characters"
                            @click:append="show2 = !show2"
                            dark
                        ></v-text-field>
                        <v-card-actions>
                            <v-btn to="/">Cancel</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn v-on:click="passwordSubmit()">Submit</v-btn>
                        </v-card-actions>
                        <label id="resetError" class=""
                            >Passwords do not match</label
                        >
                    </v-form>
                </v-col>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
const axios = require('axios').default;
export default {
    name: 'ResetPage',
    data: () => ({
        passwordInput1: '',
        passwordInput2: '',
        show1: false,
        show2: false,
        rules: {
            required: (value) => !!value || 'Required',
            min: (v) => v.length >= 8 || 'Minimum of 8 characters',
        },
    }),
    methods: {
        passwordSubmit() {
            document.getElementById('resetError').style.display = 'none';
            if (this.passwordInput1 != this.passwordInput2) {
                this.showPasswordError();
                return;
            } else {
                if (this.$refs.form.validate()) {
                    axios
                        .post(
                            'http://198.199.67.109:3000/api/updatepassword',
                            null,
                            {
                                params: {
                                    username: this.$route.query.username,
                                    password: this.passwordInput1,
                                },
                            }
                        )
                        .then((response) => {
                            if (response) {
                                console.log(response);
                                this.$router.push('/');
                            } else {
                                console.log(
                                    'Axios succeeded but response unreadable'
                                );
                                this.showConnectionError();
                            }
                        })
                        .catch((error) => {
                            if (error) {
                                console.log(error);
                                this.showConnectionError();
                            } else {
                                console.log('Unknown Error');
                                this.showConnectionError();
                            }
                        });
                }
            }
        },
        showPasswordError() {
            document.getElementById('resetError').innertHTML =
                'Passwords do not match';
            document.getElementById('resetError').style.display = 'inline';
        },
        showConnectionError() {
            document.getElementById('resetError').innertHTML =
                'Failed to update password. Please try again later.';
            document.getElementById('resetError').style.display = 'inline';
        },
    },
    mounted() {
        document.getElementById('resetError').style.display = 'none';
    },
};
</script>
