<template>
  <div class="manager-menu-container bg-primary">
    <div class="container p-0">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <router-link to="/admin" tag="a" class="navbar-brand">
          Logo
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <router-link to="/admin/users" tag="li" class="nav-item" activeClass="active">
              <a class="nav-link">Usuários <span class="sr-only">(current)</span></a>
            </router-link>
            <router-link to="/admin/children" tag="li" class="nav-item" activeClass="active">
              <a class="nav-link">Crianças <span class="sr-only">(current)</span></a>
            </router-link>
            <router-link to="/admin/supportes" tag="li" class="nav-item" activeClass="active">
              <a class="nav-link">Instituições <span class="sr-only">(current)</span></a>
            </router-link>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown link
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'managerMenu',
    mounted() {
      console.log('Component mounted.')
    }
  }
</script>

<style>
  .manager-menu-container {
    width: 100%;
  }
</style>
