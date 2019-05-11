/*$(document).ready(function(){
	$('.delete-client').on('click',function(e){
		$target=$(e.target);
		const NumClient = $target.attr('data-id');
		$.ajax({
			type:'DELETE',
			url: '/dourmettes/modifClient/'+NumClient
			success: function(response){
				alert('Client Supprimer')
				window.location.href=('/dourmettes/listeclient');
			},
			error : function(err){
				console.log(err);
			}
		})
	});
});*/