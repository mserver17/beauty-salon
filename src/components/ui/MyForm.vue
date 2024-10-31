<!-- <template lang="">
    <input
        name="my-input"
        class="form__input form-control"
        :value="modelValue" 
        @input="updateInput"
    />
</template>
<script>
export default {
    name: 'my-input',
    props:{
        modelValue: [String, Number]
    },
    methods:{
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        },
    }
}
</script>
<style lang="scss" scoped>
input{
    &:hover {
        border-color: #2f6dcf;
    }
    &:focus {
        border-color: #74a7ff;
        box-shadow: 0 0 8px #74a5ff;
    }

}
    
</style> -->
