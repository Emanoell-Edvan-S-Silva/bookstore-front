<template>
  <div class="login-page">
    <div class="q-mx-auto q-my-auto" style="width: 40%">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6 text-center q-mb-md">Login</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="username"
            outlined
            label="Nome de usuário"
            placeholder="Digite seu nome de usuário"
            @keyup.enter="login"
            :error="usernameError"
            :error-message="usernameErrorMessage"
          />
          <q-input
            v-model="password"
            type="password"
            outlined
            label="Senha"
            placeholder="Digite sua senha"
            @keyup.enter="login"
            class="q-mt-sm"
            :error="passwordError"
            :error-message="passwordErrorMessage"
          />
        </q-card-section>

        <q-card-actions class="q-pa-none">
          <div
            class="q-mx-auto q-pa-none q-flex q-justify-center q-items-center"
          >
            <q-btn label="Entrar" color="primary" @click="login" />
          </div>
        </q-card-actions>

        <q-card-section
          v-if="loginError"
          class="text-negative text-center q-mt-sm"
        >
          {{ loginError }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const loginError = ref<string | null>(null);

const usernameError = ref(false);
const passwordError = ref(false);
const usernameErrorMessage = ref('');
const passwordErrorMessage = ref('');

onMounted(() => {
  const token = sessionStorage.getItem('authToken');
  if (token === 'fakeAuthToken') {
    nextTick(() => {
      router.push('/');
    });
  }
});

async function login() {
  usernameError.value = false;
  passwordError.value = false;
  usernameErrorMessage.value = '';
  passwordErrorMessage.value = '';

  if (!username.value) {
    usernameError.value = true;
    usernameErrorMessage.value = 'Nome de usuário é obrigatório';
  }

  if (!password.value) {
    passwordError.value = true;
    passwordErrorMessage.value = 'Senha é obrigatória';
  }

  if (usernameError.value || passwordError.value) {
    return;
  }

  if (username.value === 'admin' && password.value === '1234') {
    const fakeToken = 'fakeAuthToken';
    sessionStorage.setItem('authToken', fakeToken);

    const redirectTo = Array.isArray(router.currentRoute.value.query.redirect)
      ? router.currentRoute.value.query.redirect[0]
      : router.currentRoute.value.query.redirect ?? '/';

    router.push(
      redirectTo && typeof redirectTo === 'string' ? redirectTo : '/'
    );
  } else {
    loginError.value = 'Nome de usuário ou senha incorretos';
  }
}
</script>

<style scoped>
.login-page {
  background-color: grey;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
