<script setup lang="ts">
import { Button, Input } from '@/shared/ui'
import Icons from '@/shared/ui/Icons.vue'
import { h } from 'vue'
</script>

<template>  
  <div class="p-11.75 bg-[#0E1212] border border-white/10 rounded-2xl mt-4 mb-8">
    <div class="px-[3.7813rem] flex flex-col items-stretch ">
      <div class="w-97.25 space-y-7.5 ">
        <h1 class="text-[2.5rem] text-center">Welcome Back  👋</h1>
        <div class="flex items-center gap-2.5 relative p-2.75 bg-[#99E39E]/10 rounded-xl w-full">
          <Button size="lg" rounded="xl" class="text-2xl font-semibold">
            $15
          </Button>
          <p class="text-lg font-medium">
            Приветственный <br/> бонус за регистрацию
          </p>
          <svg class="absolute right-0 bottom-0" width="82" height="70" viewBox="0 0 82 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.2502 30.7933C18.4713 25.1662 21.919 20.0412 26.3554 15.7718C30.7918 11.5023 36.1114 8.19007 41.9473 6.06345C47.7831 3.93683 53.9963 3.04645 60.1583 3.45374C66.3204 3.86102 72.2846 5.55628 77.6396 8.42257L67.9314 24.8251C65 23.2561 61.7352 22.3282 58.3621 22.1052C54.989 21.8823 51.5879 22.3696 48.3934 23.5338C45.1989 24.6979 42.2869 26.511 39.8584 28.8481C37.43 31.1852 35.5427 33.9906 34.3268 37.0709L16.2502 30.7933Z" fill="#446449"/>
            <path d="M92.5851 55.7336C90.1532 61.2832 86.5159 66.2871 81.9239 70.4001C77.3319 74.5131 71.8946 77.6374 65.987 79.5575C60.0795 81.4775 53.8422 82.1477 47.7054 81.5217C41.5686 80.8957 35.6784 78.9884 30.441 75.9315L40.7584 59.8696C43.6253 61.5429 46.8497 62.587 50.2089 62.9296C53.5682 63.2723 56.9825 62.9055 60.2163 61.8544C63.4501 60.8034 66.4265 59.0932 68.9401 56.8417C71.4537 54.5902 73.4448 51.8511 74.776 48.8133L92.5851 55.7336Z" fill="#446449"/>
            <path d="M45.5319 46.264L28.6257 70.9993L17.5131 35.6524L45.5319 46.264Z" fill="#446449"/>
            <path d="M34.3004 49.7952L17.3943 74.5306L6.28166 39.1837L34.3004 49.7952Z" fill="#446449"/>
          </svg>
        </div>
        <div class="space-y-6">
          <div class="">
            <label for="email" class="mb-2 inline-block">Email</label>
            <Input type="email" id="email" rounded="lg" placeholder="Email" :prependIcon="h(Icons, { name: 'mail' })" />
          </div>
          <div class="">
            <label for="password" class="mb-2 inline-block">Password</label>
            <Input type="password" id="password" rounded="lg" placeholder="Password" :prependIcon="h(Icons, { name: 'lock' })" />
          </div>
          <div class="flex justify-end"> 
            <button class="flex justify-end underline">Forgot password?</button>
          </div>
          <div class="space-y-5">
            <Button size="lg" rounded="xl" class="w-full flex items-center gap-2 py">
              Sign in
              <svg class="relative top-px" width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0833 4.91675H0.75" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.91708 9.08339C9.91708 9.08339 14.0837 6.01473 14.0837 4.91673C14.0837 3.81873 9.91699 0.750061 9.91699 0.750061" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </Button>
            <div class="flex items-center justify-between gap-4">
              <div class="bg-[#CFDFE2] h-px w-full"/>
              <p class="text-white/60">Or</p>
              <div class="bg-[#CFDFE2] h-px w-full"/>
            </div>
            <Button size="lg" variant="secondary" rounded="xl" class="w-full flex items-center gap-2 py">
              <Icons name="telegram" class="w-3 h-3"/>
              Sign in with Telegram              
            </Button>
            <p class="text-white/60 text-center">
              Don't you have an account? <a href="/auth/signup" class="text-[#99E39E] underline">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
