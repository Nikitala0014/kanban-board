<template>
    <div class="topnav">
        <ul class="topnav_ul">
            <!--
            <li>
                <router-link :to="{name: 'board'}"><img class="topnav_ul_icon" src="../../assets/svgImg/blackboard.svg" alt="Incoming"></router-link>
            </li>
            <li>
                <router-link :to="{name: 'today'}"><img class="topnav_ul_icon" src="../../assets/svgImg/list.svg" alt="Incoming"></router-link>
            </li> 
            -->
            <li @click.prevent="onLogout">
                <span class="logout">Logout</span>
            </li>
        </ul>
        <div></div>
    </div>
</template>

<script>
export default {
    methods: {
        onLogout() {
            this.$store.dispatch('logout')
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.topnav {
    height: 100%;
}

.topnav_ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.topnav_ul_icon:hover {
    box-shadow: 0 0 5px rgb(253, 253, 253);
    cursor: pointer;
}
.topnav_ul li.active {
    background-color: #ffffff;
}

.topnav_ul_icon {
    height: 22px;
    width: 22px
}

.logout {
    padding: 5px;
    color: white;
    background-color: black;
    border-radius: 5px;
}
.logout:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.7);
}
</style>