<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light bg-light mb-2">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Clubs</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/groups">Groups</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/schedule">Schedule</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
