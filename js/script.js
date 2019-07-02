document.getElementById("barn_start").addEventListener('input', function(a, b) { calculate(); });
document.getElementById("barn_end").addEventListener('input', function(a, b) { calculate(); });

function calculate() {
   var start = parseInt(document.getElementById("barn_start").value);
   var end = parseInt(document.getElementById("barn_end").value);
   var start_upg = calculateUpgrade(start);
   var end_upg = calculateUpgrade(end);

   if(!(start >= 50 && start <= 15000 && (start % 25) == 0)) {
      document.getElementById("result").value = ("[Error] Start is out of range (50 - 15000) or it's not divisible by 25");
      return;
   }else if(!(end >= 50 && end <= 15000 && (end % 25) == 0)) {
      document.getElementById("result").value = ("[Error] End is out of range (50 - 15000) or it's not divisible by 25");
      return;
   }else if(start_upg >= end_upg) {
      document.getElementById("result").value = ("[Error] Start must be lower than the end");
      return;
   }
   var result = 0;
   for(var i = start_upg; i < end_upg; i++) result += i;
      document.getElementById("result").value = result;
}

function calculateUpgrade(x) {
   return (x <= 1000) ? (((x - 50) / 25) + 1) : (((x - 50) / 50) + 20);
}


document.getElementById("2_barn_start").addEventListener('input', function(a, b) { calculate_2(); });
document.getElementById("2_num_sets").addEventListener('input', function(a, b) { calculate_2(); });

function calculate_2() {
   var start = parseInt(document.getElementById("2_barn_start").value);
   var sets = parseInt(document.getElementById("2_num_sets").value);

   if(!start || !sets) {
      document.getElementById("2_barn_end").value = "";
      document.getElementById("2_barn_remain").value = "";
      return;
   }
   var max = findMaxUpgrade(start, sets);
   document.getElementById("2_barn_end").value = max;
   for(var r = sets; r > 0; r--) {
      if(findMaxUpgrade(start, r) != max) {
         document.getElementById("2_barn_remain").value = ((sets - 1) - r);
         break;
      }
   }
}

function calculateUpgrade(x) {
   return (x <= 1000) ? (((x - 50) / 25) + 1) : (((x - 50) / 50) + 20);
}

function findMaxUpgrade(start, sets) {

   for(var i = 15000; i > start; i-=25 ) {
      var current_set = 0;
      for(var g = calculateUpgrade(start); g < calculateUpgrade(i); g++) current_set += g;
         if(current_set <= sets) return i;
   }
}