<template>
        <nav>
            <router-link class="router-link" to="/">
              <i class="fa-solid fa-house fa-lg"></i>
              <span>Главное</span>
            </router-link>
            <router-link class="router-link" to="/about-us">
              <i class="fas fa-info-circle fa-lg"></i>
              <span>О проекте</span>
            </router-link>
            <router-link class="router-link" to="/posts">
              <i class="fa-regular fa-file-alt fa-lg"></i>
              <span>Страница постов</span>
            </router-link>
            <router-link class="router-link" to="/create-new-post">
              <i class="fa-regular fa-file-alt fa-lg"></i>
              <span>Написать пост</span>
            </router-link>
            <router-link class="router-link" to="/settings">
              <i class="fas fa-cog fa-lg"></i>
              <span>Настройки</span> 
            </router-link>
            <router-link class="router-link" to="/authorization">
              <i class="fa-regular fa-user fa-lg"></i>
              <span>Autorization</span>
            </router-link>
            <router-link class="router-link" to="/posts-with-vuex">
              <i class="fa-regular fa-file-alt fa-lg"></i>
              <span>Написать пост <br> Vuex</span>
            </router-link>
      </nav>
</template>
<script>
export default {
  name: 'NavBar'
};
</script>
<style scoped lang="scss">
 @use '/src/assets/variables' as *;
  @use '/src/assets/mixins' as *;

</style>