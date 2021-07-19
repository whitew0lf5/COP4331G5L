<template>
	<v-container>
		<v-col cols="12"></v-col>
	<v-row class="text-center">
		<v-col cols="12">
                <v-img
                    :src="require('../assets/pikachudance.png')"
                    class="my-3"
                    contain
                    height="200"
                />
            </v-col>
		<v-col>
		<h1>Account Verified!</h1>
	</v-col>
	</v-row>
</v-container>
</template>

<script>
	const axios = require('axios').default;
	export default {
	    name: 'VerifyPage',
	    data: () => ({
	        loading: false,
	        passwordInput1: '',
	        passwordInput2: '',
	        show1: false,
	        show2: false,
	        rules: {
	            required: (value) => !!value || 'Required',
	            min: (v) => v.length >= 8 || 'Minimum of 8 characters'
	        },
	    }),
	    mounted() {
	    	axios.post("http://198.199.67.109:3000/api/verify", null, {
	    		params: {
	    			username: this.$route.query.username
	    		}
	    	}).then((response) => {
	    		console.log(response)
	    	}).catch((error) => {
	    		console.log(error)
	    	})
	    }
	}
</script>