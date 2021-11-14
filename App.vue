<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// plus.screen.lockOrientation('landscape-primary'); //锁定
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onResize: function() {
			console.log('App onResize')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
