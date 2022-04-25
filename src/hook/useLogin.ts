/* eslint-disable no-undef */
import { reactive, toRefs,ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ElLoading } from 'element-plus'
interface LoginInfo {
  userName: string;
  password: string;
  phoneCode: string;
  phoneNum: string;
  err: string;
}
interface LoginData {
  logType: string;
  loginInfo: LoginInfo;
}

export default function useLogin() {
  const loginForm = ref<FormInstance>()
  const data = reactive<LoginData>({
    logType: 'acct',
    loginInfo: {
      userName: 'pa',
      password: 'joyea8803',
      phoneCode: '',
      phoneNum: '',
      err: ''
    }
  })
  const rules = reactive({
    userName: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      },
    ],
  })
  const router = useRouter()
  const route = useRoute()
  const login = async(formEl: FormInstance | undefined):Promise<void|boolean> => {
    if (!formEl) return
    await formEl.validate(async(valid, fields) => {
      if (valid) {
        if (data.logType === 'acct') {
          const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          localStorage.setItem('token','tokentest123')
          // const tknFac = window.acp.ioc.resolve(window.acp.cls.ITokenFactory)
          // const r = await tknFac.createToken({
          //   userNo: data.loginInfo.userName,
          //   password: data.loginInfo.password,
          //   appId: window.acp.appInfo.id
          // })
          // window.acp.us.setToken(r)
          // const usr = await window.acp.us.req.post(window.acp.rmt.def, 'NcUser/curuser')
          // const jsn = await usr.json()
          // window.acp.us.setUser(jsn.id, jsn.userName, jsn.realName)
          if (route.params.redirect) {
            router.replace({ path: route.params.redirect as string })
          } else {
            router.replace({ name: 'Dashboard' })
          }
          loading.close()
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }
  return {
    ...toRefs(data),
    rules,
    loginForm,
    login
  }
}
