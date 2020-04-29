<template>
    <div class='not-found container'>
        <div class="card-panel center">
            <div class="card-content">
                <i class="material-icons large deep-purple-text darken-2">error_outline</i>
                <h2>Oops!</h2>
                <p>The page you were trying to access doesn't exist.</p>
            </div>
            <div class="card-bottom">
                <button @click="$router.push({name: 'GMap'})" 
                    class="btn-large deep-purple darken-2"
                >Return to map</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style>
    .not-found {
        margin-top: 60px;
        max-width: 600px;
    }
</style>