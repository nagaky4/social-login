<template lang='html'>
  <div class="login-page">
    <v-row>
      <v-col :cols="12">
        <div class="login-form">
          <div class="login-title">Wellcome to this page</div>
          <form class>
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              label="Password"
              required
              type="password"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
            <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
            <div class="section-btn">
               <v-btn  class="btn" @click="submit" :disabled="submitStatus === 'PENDING'">submit</v-btn>
               <v-btn  class="clr-btn btn" @click="clear">clear</v-btn>
            </div>
          </form>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <div id="firebaseui-auth-container" class="m-auto"></div>
    </v-row>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";
export default {
  name: "Login",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required }
  },
  mounted() {
    var uiConfig = {
      signInSuccessUrl: "/home",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
    };
    if(firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance()
      ui.start('#firebaseui-auth-container', uiConfig)
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  },
  data: () => ({
    email: "123@gmail.com",
    password: "",
    submitStatus: null
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        const valueSubmit = {
          email: this.email,
          password: this.password
        };
        console.log("submit");
        console.log(valueSubmit);

        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    }
  }
};
</script>


<style lang="scss" slot-scope>
.login-page {
  //   background-color: #edeeef;
  height: 100%;
}
.login-form {
  text-align: center;
  width: 500px;
  margin: auto;
}
.login-title {
  font-size: 30px;
  margin: 20px;
}

.section-btn {
  width: 230px;
  margin: auto;
}

.clr-btn {
  float: right;
}

.btn {
  width: 90px;
  padding: 10px;
}

.m-auto {
  margin: auto;
}
</style>