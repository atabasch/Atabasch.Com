# VUE 3

## (1) • State işlemleri
```js 
import {ref, reactive, readonly} from "vue";

// State oluşturur
const name = ref('');
name.value = 'Furkan';

const age = ref(30);
age.value++

const skills = ref([]);
skills.value.push('PHP');

// refden gelen datayı ham olarak almak.
const ham = toRaw(refName.value)

// Obje state'i oluşturur. reactive içindeki elemanlar ilk başta belirtilmeli
const user = reactive({
   username:    'asw13tr',
   password:    'testPass',
   email:       'furkan@atabasch.com',
   status:      false 
});
user.status = true;

const roUser = readonly(user);
roUser.status = true; // hata verir.
```

## (2) • Methodlar
Methodlar direkt olarak script tagı içerisinde tanımlanır. normal javascript fonksiyonu gibi.

## (3) • Computed
```js 
import {ref, computed} from "vue";
const items = ref([]);
const getItems = computed(() => items.value )
```

## (4) • Watch (İzleyiciler)
```js
import {ref, watch} from "vue";
const counter = ref(0);
watch(counter, (counter, prevCounter) => {
    // ....
})
```

## (5) • PROPS
```js
import {defineProps} from "vue";
const props = defineProps(['posts'])

const props = defineProps({
    post: {
        type:Object,
        defaultValue: {}
    }
})
```

## (5) • Emit
```js

const emit = defineEmits(['created', 'updated''])


emit('created')
```


# Nuxt 3

## [1] - Fetch & $fetch
Sayfa ve Component ilk çalıştığında iki tarafl olarak çalışan ilk fonksiyon.
```js
const items = ref([])

useFetch('/api/path').then( ({data, error}) => {
    
    items.value = toRaw(data.value.items)
    
} ).catch(err => {})

// TUŞA TIKLANDIĞINDA İSTEK ATMAK İÇİN
$fetch('/api', {method:'POST', body: {post: toRaw(refName)}}).then(response => {
    response.returnedData
})
```

## [2] - Server - Api
Kök klasörde **/server/api** yolu oluşturulduğunda otomatik olarak. `/api` şeklinde server oluşturulur. Her bir api dosyası aşağıdaki gibi oluşturulabilir.
```js
export default defineEventHandler(async (event) => {
    // url pathdeki parametreleri alır.
    const {id} = event.context.params;

    // ?id=x&name=y
    let { id, name } = getQuery(event);

    // Post'dan gelen verileri alır.
    let {username, password} = await readBody(event)

    // başka bir fetch isteği
    await $fetch('/rest/path')

    // Çerezlere erişmek
    const cookies = parseCookies(event)
    
    // Runtime ayarlarına erişmek (nuxt.config.js) dosyasındaki ayarlar.
    const config = useRuntimeConfig()

    // Ekran basılacak JSON
    return { status: true }
})
```


## [3] - Global Eklentiler Oluşturmak
`plugins/globalHerlpers.js`
```js
export default defineNuxtPlugin(() => {
    return {
        provide: {
            getDateFormat: function(date, format, local='tr-TR'){
                let dateObject = new Date(date);
                return dateObject.toLocaleString(local, formatTypes[format]);
            },
            
            showToast(message, type='success'){
                if(process.client){
                    Swal.fire({title:message, icon:type, toast:true, position:'top-end', timer:3000})
                }
            }, //toast
        }
    }
})
```

`templatefile.vue`
```vue
<template>
    {{ $getDateFormat(datestr) }}
</template>

<script setup>
// script içinde useNuxtApp den çağırmak gerekiypr.
const { $showToast } = useNuxtApp()
</script>
```


## [4] - Router
2 adet yönlendirici composable vardır.
- useRoute()
- useRouter()

#### [4.1] - useRoute()
```js
const route = useRoute()
route.params.param_name // page/[param_name].vue dosyasındaki [param_name] değerini alır.
route.query.param_name // ?param_name=xyz değerini alır.
route.path
route.fullPath
route.hash
route.name
route.redirectedFrom
route.meta
route.matched
```

#### [4.2] - useRouter()
Yönlendirme işlemleri için kullanılır.
```js
const router = useRouter()
router.push('/path')
router.replace('/path')

router.go(-1) // Mümkünse 1 sayfa geri gider.
router.back()

router.go(1) // Mümkünse geri gelindikten sonra 1 sayfa ileri gider.
router.forward()

```



# Sequelize

## one-to-one
```js

```


## OP Sorgular
```js
where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // Basics
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // Using dialect specific column identifiers (PG in the following example):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // Number comparisons
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // Other operators

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)

      [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // match text search for strings 'fat' and 'rat' (PG only)

      // In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY (ARRAY['cat', 'hat'])

      // There are more postgres-only range operators, see below
    }
    ```
