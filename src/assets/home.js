$('#exampleModal2').on('hidden.bs.modal', function (e) {
    // Lấy thẻ iframe của video
    var iframe = document.getElementById('videoTrailer');
    // Lấy video player từ iframe
    var player = new YT.Player(iframe);

    // Kiểm tra xem video player có tồn tại không
    if (player) {
        // Dừng video
        player.pauseVideo();
    }
});
