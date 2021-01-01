(function() {
    var header = document.getElementById("header");
    var ipBox = document.createElement("div");
    ipBox.style.width = "100%";
    ipBox.style.background = "#eee";
    ipBox.style.position = "absolute";
    ipBox.style.top = "0";
    ipBox.style.padding = "5px";
    ipBox.innerHTML = "IP address will appear here"
    header.appendChild(ipBox);

    var oldRTCPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function(...args) {
        var pc = new oldRTCPeerConnection(...args);
        pc.oldAddIceCandidate = pc.addIceCandidate;

        pc.addIceCandidate = function(iceCandidate, ...rest) {
            var fields = iceCandidate.candidate.split(' ')

            if (fields[7] === "srflx") {
                var ip = fields[4];
                ipBox.innerHTML = "Stranger's IP Address: <strong>" + ip + "</strong>";
            }

            return pc.oldAddIceCandidate(iceCandidate, ...rest);
        }

        return pc;
    }
})();