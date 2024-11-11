<template>
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
			<!-- Image gallery -->
			<TabGroup as="div" class="flex flex-col-reverse">
				<!-- Image selector -->
				<div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
					<TabList class="grid grid-cols-4 gap-6">
						<Tab v-for="image in product.images" :key="image.id"
							class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
							v-slot="{ selected }">
							<span class="sr-only">{{ image.name }}</span>
							<span class="absolute inset-0 overflow-hidden rounded-md">
								<img :src="image.src" alt="" class="h-full w-full object-cover object-center" />
							</span>
							<span
								:class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']"
								aria-hidden="true" />
						</Tab>
					</TabList>
				</div>

				<TabPanels class="aspect-h-1 aspect-w-1 w-full">
					<TabPanel v-for="image in product.images" :key="image.id">
						<img :src="image.src" :alt="image.alt" 
							class="h-full w-full object-cover object-center sm:rounded-lg asdfasdfasdfasdfasd" />
					</TabPanel>
				</TabPanels>
			</TabGroup>

			<!-- Product info -->
			<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ productItem.name }}</h1>

				<div class="mt-3">
					<h2 class="sr-only">Product information</h2>
						<p class="text-3xl tracking-tight text-gray-900">￥{{ (productItem.price / 100).toFixed(2) }}</p>
				</div>

				<!-- Reviews -->
				<div class="mt-3">
					<h3 class="sr-only">Reviews</h3>
					<div class="flex items-center">
						<div class="flex items-center">
							<StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
								:class="[product.rating > rating ? 'text-indigo-500' : 'text-gray-300', 'h-5 w-5 shrink-0']"
								aria-hidden="true" />
						</div>
						<p class="sr-only">{{ product.rating }} out of 5 stars</p>
					</div>
				</div>

				<form class="mt-6">
					<!-- Colors -->
					<div>
						<h3 class="text-sm font-medium text-gray-600">Color</h3>

						<fieldset aria-label="Choose a color" class="mt-2">
							<RadioGroup v-model="selectedColor" class="flex items-center space-x-3">
								<RadioGroupOption as="template" v-for="color in product.colors" :key="color.name"
									:value="color" :aria-label="color.name" v-slot="{ active, checked }">
									<div
										:class="[color.selectedColor, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none']">
										<span aria-hidden="true"
											:class="[color.bgColor, 'h-8 w-8 rounded-full border border-black border-opacity-10']" />
									</div>
								</RadioGroupOption>
							</RadioGroup>
						</fieldset>
					</div>

					<div class="mt-10 flex">
						<button type="submit"
							class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">Add
							to bag</button>

						<button type="button"
							class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
							<HeartIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
							<span class="sr-only">Add to favorites</span>
						</button>
					</div>
				</form>
			</div>

			<div class="mt-6">
				<h3 class="sr-only">Description</h3>

				<div class="space-y-6 text-base text-gray-700" v-html="productItem.description" />
			</div>

		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	RadioGroup,
	RadioGroupOption,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
} from '@headlessui/vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline';
import { getSpuDetail } from '@/api/product';

const product = {
	name: 'Zip Tote Basket',
	price: '$140',
	rating: 4,
	images: [
		{
			id: 1,
			name: 'Angled view',
			src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-01.jpg',
			alt: 'Angled front view with bag zipped and handles upright.',
		},
		{
			id: 2,
			name: 'Angled view',
			src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-01.jpg',
			alt: 'Angled front view with bag zipped and handles upright.',
		},
		{
			id: 3,
			name: 'Angled view',
			src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-01.jpg',
			alt: 'Angled front view with bag zipped and handles upright.',
		},
		{
			id: 3,
			name: 'Angled view',
			src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-01.jpg',
			alt: 'Angled front view with bag zipped and handles upright.',
		},
		{
			id: 4,
			name: 'Angled view',
			src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-01.jpg',
			alt: 'Angled front view with bag zipped and handles upright.',
		},
		{
			id: 5,
			name: 'Angled view',
			src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-01.jpg',
			alt: 'Angled front view with bag zipped and handles upright.',
		},
		// More images...
	],
	colors: [
		{ name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
		{ name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
		{ name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
	],
	description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
	details: [
		{
			name: 'Features',
			items: [
				'Multiple strap configurations',
				'Spacious interior with top zip',
				'Leather handle and tabs',
				'Interior dividers',
				'Stainless strap loops',
				'Double stitched construction',
				'Water-resistant',
			],
		},
		// More sections...
	],
}
const productItem = ref(
	{
    "id": 639,
    "name": "旧的界面",
    "introduction": "2048",
    "description": "<p>qq</p>",
    "categoryId": 19,
    "picUrl": "https://buzaio.s3.ap-northeast-2.amazonaws.com/214faea41f9ab74a6f4813aa7f24cc3f34ab2a2f97d5e54c0a01e9f27f473069.png",
    "sliderPicUrls": [
        "http://127.0.0.1:48080/admin-api/infra/file/4/get/8fcc4f5a7952d8c0feb21c0cac7459ca5cdc11311186b75f36187ebba8a2f128.jpg"
    ],
    "specType": false,
    "price": 100,
    "marketPrice": 200,
    "vipPrice": 0,
    "stock": 4,
    "skus": [
        {
            "id": 29,
            "properties": [
                {
                    "propertyId": 0,
                    "propertyName": "默认",
                    "valueId": 0,
                    "valueName": "默认"
                }
            ],
            "price": 100,
            "marketPrice": 200,
            "vipPrice": null,
            "picUrl": "",
            "stock": 4,
            "weight": 5,
            "volume": 6
        }
    ],
		salesCount: 0
	}
);
const selectedColor = ref(product.colors[0])

onMounted(() => {
	const route = useRoute();
	const id = route.params.id;
	getSpuDetail(id).then(res => {
		productItem.value = res.data;
	})
})
</script>
