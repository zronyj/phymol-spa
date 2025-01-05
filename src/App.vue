<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
export default {
    data() {
        return {
            publicPath: '.'
        }
    }
}
</script>

<template>
    <header>
        <div class="container-fluid start">
            <div class="phymol">
                <img class="phymol-logo" :src="publicPath + '/img/mini.png'" alt="PHYMOL">
            </div>
            <div class="phymol-title">
                <div class="valignment">
                    <h1>PHYMOL</h1>
                    <span class="subtitle">Physics, Accuracy and Machine Learning: Towards the next-generation of Molecular Potentials</span>
                </div>
            </div>
        </div>
    </header>
    <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav nav-pretty">
                    <li>
                        <a class="navbar-brand nav-align-style router-link" href="#">
                            <img class="mini-logo" :src="publicPath + '/img/mini.png'" alt="">
                            <router-link to="/" class="router-link"><b>PHYMOL</b></router-link>
                        </a>
                    </li>
                    <li class="nav-item">
                        <router-link to="/students" class="nav-link nav-align-style js-scroll-trigger">DOCTORAL CANDIDATES</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/projects" class="nav-link nav-align-style">RESEARCH PROJECTS</router-link>
                    </li>
                    <li class="nav-item dropdown" data-bs-theme="dark">
                        <a href="#" class="nav-link nav-align-style dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">NETWORK</a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link to="/beneficiaries" class="nav-link nav-align-style js-scroll-trigger">BENEFICIARIES</router-link>
                            </li>
                            <li>
                                <router-link to="/partners" class="nav-link nav-align-style js-scroll-trigger">PARTNERS</router-link>
                            </li>
                            <li>
                                <router-link to="/members" class="nav-link nav-align-style js-scroll-trigger">MEMBERS</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link to="/recruitment" class="nav-link nav-align-style">RECRUITMENT</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/events" class="nav-link nav-align-style">EVENTS</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/training" class="nav-link nav-align-style">TRAINING</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" class="nav-link nav-align-style">ABOUT</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
    <main class="container">
        <div class="page-content">
            <RouterView />
        </div>
    </main>
</template>

<style scoped>

</style>
