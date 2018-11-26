function openNav() {
    document.getElementById("locationBtn").style.opacity = 0;
    document.getElementById("menuBtn").style.opacity = 0;
    document.getElementById("myNav").style.width = "100%";
    setTimeout(function(){
        document.getElementById("overlayContent").style.display = "block";
        document.getElementById("overlayContent").style.opacity = 1;
    },400); 
}

function closeNav() {
    document.getElementById("overlayContent").style.opacity = 0;
    setTimeout(function(){
        document.getElementById("myNav").style.width = "0%";
        document.getElementById("menuBtn").style.opacity = 1;
        document.getElementById("locationBtn").style.opacity = 1;
    },200);
}

function detailInfoOn(){
    document.getElementById("overlayContent").style.opacity = 0;
    setTimeout(function(){
        document.getElementById("overlayContent").style.display = "none";
        document.getElementById("detailInfoContent").style.display = "block";
    },200); 
    document.getElementById("detailInfoContent").style.opacity = 1;
}

function detailInfoOff(){
    document.getElementById("detailInfoContent").style.opacity = 0;
    setTimeout(function(){
        document.getElementById("detailInfoContent").style.display = "none";
        document.getElementById("overlayContent").style.display = "block";
    },200); 
    document.getElementById("overlayContent").style.opacity = 1;
}
