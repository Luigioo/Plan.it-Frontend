var plans=[];
export var events=[];

export function loadEvents(info, successCallback, failureCallback){
    plans=[];
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    // var _this = this;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4){
            if(this.status == 200) {
                var arr = JSON.parse(this.responseText);
                for(var i=0;i<arr.length;i++){
                    // console.log(arr[i]);
                    // console.log("olala\n");
                    var p = arr[i];
                    // console.log(typeof(new Array()));
                    plans.push({
                        id: p.id,
                        name: p.name,
                        start: p.start,
                        end: p.end,
                        allDay: p.allday
                    });
                }
                // this.plansToEvents();
                events=plans.map(function(p){
                return{
                    id: p.id,
                    title:p.name,
                    start:p.start,
                    end:p.end,
                    allDay:p.allDay
                }
                });
                console.log(events);
                successCallback(events);
            }else{
                failureCallback("cannot load plans");
            }

        }
    };
    xhttp.open("GET", process.env.VUE_APP_BACKEND+"plan", true);
    xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}
export function deletePlan(id){
    if(id!=null){
        var xhttp = new XMLHttpRequest();
        xhttp.withCredentials=true;
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                //adsaf
            }
        }
        xhttp.open("Delete", process.env.VUE_APP_BACKEND+"plan/"+id, true);
        xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    }
}

