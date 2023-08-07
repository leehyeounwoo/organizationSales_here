<template>
	<v-container>
		<v-layout wrap justify-center>
			<v-layout class="login_background_t" flex-wrap justify-center>
				<v-layout style="max-width:768px; padding:0px 10px;" wrap justify-center>
					<div>
						<div class="text-center" style="margin: 0 auto; max-width:375px;">
							<div class="mt-12">
								<v-img src="/image/counselor_login_0.png"></v-img>
							</div>
							<v-btn
								elevation="0"
								height="40"
								class="loginButton_small mt-7"
								block
								color="#F6F2E9"
								@click="$router.push({ name: 'counselorRegister' })"
							>
								<v-icon class="mr-4">mdi-email-outline</v-icon>
								<span class="pb-1" style="font-size:14px; font-weight:normal;"> Sign up with EMAIL </span>
							</v-btn>
							<div style="font-weight:300; font-size:12px;" class="mt-12">
								Already have an account?
								<span
									class="ml-6"
									style="color:#633efd; font-weight:normal; font-size:14px; cursor:pointer; "
									@click="$router.push({ name: 'counselorLogin' })"
								>
									Log In
								</span>
							</div>
							<v-btn
								elevation="0"
								height="40"
								class="loginButton_small"
								block
								color="primary2"
								@click="$router.push({ name: 'counselorLogin' })"
							>
								<span style="color:white;	font-weight: bold;"> LOG IN </span>
							</v-btn>
						</div>
					</div>
				</v-layout>
			</v-layout>
		</v-layout>
	</v-container>
</template>
