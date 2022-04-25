<script lang="ts">
import { defineComponent,resolveComponent,h } from 'vue'
export default defineComponent({
    name:'MenuItem',
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    render(context:any) {
        const vnodes = []

        if (context.icon) {
            if (context.icon.includes('el-icon')) {
                // vnodes.push(`<i class={[${icon}, 'sub-el-icon']} />`)
                vnodes.push(h(resolveComponent(Location.name),{class:`sub-el-icon ${context.icon}`}))
            } else {
                // vnodes.push(`<svg-icon icon-class=${icon}/>`)
                vnodes.push(h(resolveComponent('svg-icon'),{'icon-class':context.icon??'dashboard'}))
            }
        }

        if (context.title) {
            vnodes.push(h('span',null,context.title))
        }
        return vnodes
    }
})
</script>