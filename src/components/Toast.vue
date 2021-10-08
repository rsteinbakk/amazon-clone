<template>
    <div id="snackbar" :class="{ show: activeToast }" v-if="activeToast">
        <div class="snack-color">&nbsp;</div>
        <div class="text">
                        <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        activeToast: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            runToast: false,
        }
    },
    methods: {
        runSnackbar() {
            const model = this;
            this.runToast = true;
            setTimeout(function () { model.runToast = false }, 3000);
        }
    },
    computed: {
        startToast() {
            if (this.activeToast) {
                this.runSnackbar();
                return true;
            } else {
                return false;
            }
        }
    },
}
</script>

<style lang="css" scoped>
.snack-color {
    background-image: linear-gradient(rgb(255, 234, 163), rgb(236, 202, 47));
    background-image: linear-gradient(rgb(202, 233, 187), rgb(145, 209, 115));
    height: 100%;
    width: 25px;
    border-radius: 5px 0 0 5px; /* Rounded borders */
}
.text {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    margin: 15px;
    font-size: 14px;
}
#snackbar {
    visibility: hidden; /* Hidden by default. Visible on click */
    min-width: 250px; /* Set a default minimum width */
    margin-left: -125px; /* Divide value of min-width by 2 */
    background-color: rgba(221, 221, 221, 0.363); /* Black background color */
    box-shadow: 1px 1px 4px rgb(194, 194, 194);
    color: rgb(0, 0, 0); /* White text color */
    border-radius: 30px;
    text-align: center; /* Centered text */
    border-radius: 5px; /* Rounded borders */
    position: fixed; /* Sit on top of the screen */
    z-index: 1; /* Add a z-index if needed */
    left: 50%; /* Center the snackbar */
    bottom: 30px; /* 30px from the bottom */
    display: flex;
    justify-content: left;
    height: 50px;
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
    visibility: visible; /* Show the snackbar */
    /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }
    to {
        bottom: 30px;
        opacity: 1;
    }
}

@keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }
    to {
        bottom: 30px;
        opacity: 1;
    }
}

@-webkit-keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }
    to {
        bottom: 0;
        opacity: 0;
    }
}

@keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }
    to {
        bottom: 0;
        opacity: 0;
    }
}
</style>