<template>
    <div class="top_bar">
        <div class="top_bar_inner">
            <div class="left_control">
                <div class="logotype-work">
                    <span>
                        WorkSpace
                    </span>
                </div>
            </div>
            <div class='top_control'>
                <top-nav></top-nav>
            </div>
        </div>
    </div>
</template>

<script>
import topNav from './topNav.vue'
export default {
  components: { topNav }
}
</script>

<style>
.top_bar {
    height: 45px;
    box-shadow: 0 0 5px rgb(189, 210, 255);
    background-color: rgba(81, 171, 255, 0.781);
    top: 0;
    position: fixed;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid transparent;
    width: 100vw;
    padding-left: 55px;
    padding-right: 42px;
    transition: height .2s ease-in
}

.logotype-work{
    color: white;
    box-shadow: 0 0 3px rgb(189, 210, 255);
    border-radius: 5px;
    padding: 5px;
    font-size: 22px;
    font-family: 'Noto Sans', sans-serif;
}

.top_bar_inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

</style>