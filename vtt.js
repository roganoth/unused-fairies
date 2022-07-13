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
        magic: true,
        AC: 16,
        damageDie: 8,
        damageBonus: 4,
        hpMax: 31,
        currentHP: 31
    }
    
    var bear = {
        name: "Brown bear",
        attBonus: 8,
        magic: false,
        AC: 11,
        damageDie: 8,
        damageBonus: 4,
        hpMax: 34,
        currentHP: 34
    }
    
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
    
    var hitCheck = function(hitValue, AC, damage, attacker, target){
        if (hitValue >= AC) {
            hitConfirm = true;
            console.log("Hit! " + target.name + " takes " + damage + " damage!")
            $("#combatText").text(attacker.name + " has struck " + target.name + " dealing " + damage + "!");
            target.currentHP = target.currentHP - damage
            updateDOM();
            deathCheck(attacker, target);
        }
        else {
            hitConfirm = false;
            console.log("Miss!")
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
    
    
    