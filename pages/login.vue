
<template>
    <v-btn @click="login('github')">Login with GitHub</v-btn>
    <v-btn @click="logout"> Logout</v-btn>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseAuthClient()
const router = useRouter()
// Login method using providers
const login = async (provider: 'github' | 'google' | 'gitlab' | 'bitbucket') => {
    const { error } = await client.auth.signInWithOAuth({ provider })
    if (error) {
        return alert('Something went wrong !')
    }
}

const logout = async () =>
    await client.auth.signOut()

</script>

(auth.uid() IN ( SELECT members.user_id
   FROM members
  WHERE (members.team_id = teams.id)))