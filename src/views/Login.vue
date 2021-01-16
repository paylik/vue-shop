<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card width="500" class="mx-auto mt-5" elevation="8">
          <v-card-title>
            <h1 class="display-1">Авторизация</h1>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid" ref="form" validation>
              <v-text-field
                label="Имя"
                prepend-icon="mdi-account-circle"
                v-model="email"
                :rules="nameRules"
              ></v-text-field>
              <v-text-field
                label="Пароль"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                v-model="password"
                :counter="12"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              :loading="!loading"
              :disabled="!valid || !loading"
              @click="onSubmit"
            >Войти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  // @Prop() private msg!: string;

  private showPassword = false;

  private valid = false;

  private email = '';

  private nameRules = [
    (v: any) => !!v || 'Имя не определено',
    (v: any) => v.length >= 8 || 'Имя должно быть не менее 8 символов'];

  private password = '';

  private passwordRules = [
    (v: any) => !!v || 'Пароль не введен',
    (v: any) => v.length >= 8 || 'Пароль должен быть не менее 8 символов'];

  private onSubmit(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('loginUser', user)
        .then(() => this.$router.push('/'))
        .catch(() => console.log(this.email));
    }
  }

  private loading(): void {
    return this.$store.getters.loading;
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
