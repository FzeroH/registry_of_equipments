<template>
          <div class="tables-container">
            <router-link :to="'/'" exact active-class="active-link" class="link">Оборудование</router-link>
            <router-link :to="'/division'" exact active-class="active-link" class="link">Структурные подразделения</router-link>
            <router-link :to="'/responsibles'" exact active-class="active-link" class="link">Мат. ответственные</router-link>
            <router-link :to="'/type'" exact active-class="active-link" class="link">Тип оборудования</router-link>
            <router-link :to="'/status'" exact active-class="active-link" class="link">Статус оборудования</router-link>
        </div>
  <router-view />
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,.link,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}
  article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}
  html{height:100%}
  body{line-height:1}
  ol,ul{list-style:none}
  blockquote,q{quotes:none}
  blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}
  table{border-collapse:collapse;border-spacing:0}

  
  .tables-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 20px;
    }

  .link {
        margin-left:15px;
        color: #1c274c;
        text-decoration: none;
        transition: 100ms ease;
    }

    .link:hover {
        font-weight: bold;
        transition: 100ms ease;
    }
    
    .active-link {
        font-weight: bold;
        text-decoration: underline;
    }
</style>
