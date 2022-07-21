$(document).ready(function(){
    console.log("yoooo")
    var hitConfirm
    
    // var damage = function(dieSize){
    //    return(Math.floor(Math.random() * dieSize) + 1);
    // }
    
    // var d20 = function(bonus) {
    //     Math.floor(Math.random() * 20) + 1 + bonus;
    // }
    
    var rex = {
        name: "Rex Troy",
        attBonus: 6,
        AC: 16,
        damageDie: 8,
        damageBonus: 4,
        hpMax: 31,
        currentHP: 31
    }
    
    var bear = {
        name: "Brown bear",
        attBonus: 8,
        AC: 11,
        damageDie: 8,
        damageBonus: 4,
        hpMax: 34,
        currentHP: 34
    }
    
    function populateResults(data) {
        var dudes = data.combatants;
        var len = data.combatants.length;

        var dudes_elem = $("#combatantSelection");
        for (i = 0; i < len; i++) {
            //adding data attr to button for modal
            var selectorButton = $("<button>");
            selectorButton.addClass("dudeInfo");
            selectorButton.addClass("btn btn-info btn-sm");
            selectorButton.att("id","select");
            selectorButton.attr("data-id", dudes[i].id);
            selectorButton.attr("data-name", dudes[i].name);
            selectorButton.attr("data-ac", dudes[i].ac);
            selectorButton.attr("data-attack", dudes[i].attack);
            selectorButton.attr("data-damageDie", dudes[i].damageDie);
            selectorButton.attr("data-damageBonus", dudes[i].damageBonus);
            selectorButton.attr("data-currentHp", dudes[i].currentHp);
            selectorButton.attr("data-maxHp", dudes[i].maxHp);
            selectorButton.attr("data-strSave", dudes[i].strSave);
            selectorButton.attr("data-dexSave", dudes[i].dexSave);
            selectorButton.attr("data-conSave", dudes[i].conSave);
            selectorButton.attr("data-intSave", dudes[i].intSave);
            selectorButton.attr("data-wisSave", dudes[i].wisSave);
            selectorButton.attr("data-chaSave", dudes[i].chaSave);
            selectorButton.text("Choose");

                
            var nameString = $(`<li> ${dudes[i].name} </li><hr>`);

            
            nameString.append(selectorButton);
            dudes_elem.append(nameString);
        };
    };

    $.ajax("/combatants", {
        type: "GET"
    }).then(function (data) {
        populateResults(data);
        console.log("got it")
    });


    var deathCheck = function(attacker, target){
        if (target.currentHP <= 0){
            $("#hpTracker").text(attacker.name + " has defeated " + target.name + "!");
            $("#combatText").empty()
        }
    }
    
    var updateDOM = function() {
        $("#hpTracker").text("The Bear's HP is currently " + bear.currentHP + " and Rex's current HP is " + rex.currentHP);
    }
    
    updateDOM();
    
    // var hitCheck = function(hitValue, AC, damage, attacker, target){
    //     if (hitValue >= AC) {
    //         hitConfirm = true;
    //         console.log("Hit! " + target.name + " takes " + damage + " damage!")
    //         $("#combatText").text(attacker.name + " has struck " + target.name + " dealing " + damage + "!");
    //         target.currentHP = target.currentHP - damage
    //         updateDOM();
    //         deathCheck(attacker, target);
    //     }
    //     else {
    //         hitConfirm = false;
    //         console.log("Miss!")
    //         $("#combatText").text(attacker.name + " has missed " + target.name + "!")
    //     }
    //     console.log(hitConfirm)
    // }

    var hitCheck = function(hitValue, AC, damage, attacker, target){
        var raw = hitValue - attacker.attBonus
        var criticalDamage = damage + Math.floor(Math.random() * attacker.damageDie) + 1
        // console.log(criticalDamage)
        console.log(raw)
        if (raw === 20){
            hitConfirm = true;
            console.log("CRITICAL!!! " + target.name + " takes double damage!")
            $("#combatText").text(attacker.name + " has critically struck " + target.name + " for " + criticalDamage + "!")
            target.currentHP = target.currentHP - criticalDamage
            updateDOM();
            deathCheck(attacker, target);
        } else if (hitValue >= AC && raw > 1) {
            hitConfirm = true;
            // console.log("Hit! " + target.name + " takes " + damage + " damage!")
            $("#combatText").text(attacker.name + " has struck " + target.name + " dealing " + damage + "!");
            target.currentHP = target.currentHP - damage
            updateDOM();
            deathCheck(attacker, target);
        }
        else if (hitValue < AC || raw === 1){
            hitConfirm = false;
            // console.log("Miss!")
            $("#combatText").text(attacker.name + " has missed " + target.name + "!")
        }
        console.log(hitConfirm)
    }
    
    var attack = function(attacker, target) {
        var damage = function(dieSize, bonus){
            return(Math.floor(Math.random() * dieSize) + 1 + bonus);
         }
         var d20 = function(bonus) {
            return(Math.floor(Math.random() * 20) + 1 + bonus);
        }
         
        var toHit = d20(attacker.attBonus)
        var ac = target.AC
        var result = damage(attacker.damageDie, attacker.damageBonus)
        console.log(toHit)
        console.log(attacker.damageBonus)
        console.log(result)
    
        hitCheck(toHit, ac, result, attacker, target)
    }
    
    var bearAttack = function() {
        attack(bear, rex)
    }
    
    var rexAttack = function() {
        attack(rex, bear)
    }
    
    $("#bear").click(function() {
        bearAttack();
    })
    
    $("#rex").click(function(){
        rexAttack();
    })

    $("#reset").click(function(){
        rex.currentHP = rex.hpMax
        bear.currentHP = bear.hpMax
        updateDOM();
        $("#combatText").text("Again!")
    })
    
    })
    
    
    