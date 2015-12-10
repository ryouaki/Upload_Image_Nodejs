/*
 * admin main controller
 */
(function() {
  var tabs = { // name : url
    Home : execHome,
    Production : execProduct,
    User : execUser,
    System : execSystem
  };

  var common_info = {};
  /*
   * admin_onload : entry function
   */
  admin_main_controller();
  
  function checkSession(error){
    if(error!=undefined&&error=="session_failed"){
      window.location.href = "/admin";
    } 
  }
  /*
   * admin_main_controller : main control function
   */
  function admin_main_controller() {
    // initialize
    var menu = $("#admin_main_menu");
    $("#admin_main_panel_body").append(createProcessDialog);
    for ( var key in tabs) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#";
      a.innerHTML = key;
      li.appendChild(a);
      li.onclick = tabs[key];
      menu.append(li);
    }
    menu.children().first().addClass("active");
    menu.append('<p class="navbar-text navbar-right admin_main_signout">'
        + '<a href="/admin/logout" class="navbar-link">Sign out</a></p>');
    execHome();
  }

  /*
   * changeTabStatus : control the status of tabs
   */
  function changeTabStatus(tag) {
    $("#admin_main_menu").children().removeClass("active");
    $(tag).addClass("active");
    $("#admin_main_sub_menu").empty();
  }

  function execHome(event) {
    if (event != undefined)
      changeTabStatus(event.currentTarget);
    $("#process_dialog").show();
    $("#admin_main_panel_header").text(admin.home);
    $("#admin_main_div").empty();
    $("#admin_main_div")
        .load(
            "/template/admin_main/admin_main_home.html",
            null,
            function(responseTxt, statusTxt, xhr) {
              if (statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);
              else {
                // ------------------------Edit Years------------------------------
                var admin_main_home_years_edit_btn = $("#admin_main_home_years_edit_btn");
                var admin_main_home_years_text = $("#admin_main_home_years_text");
                admin_main_home_years_edit_btn.removeAttr("disabled");
                admin_main_home_years_text.keyup(function() {
                  admin_main_home_years_edit_btn.removeAttr("disabled");
                });
                admin_main_home_years_edit_btn
                    .click(function(event) {
                      if (admin_main_home_years_edit_btn.text() == "Save") {
                        $("#process_dialog").show();
                        $.post("/admin/updateYears", {
                          years : admin_main_home_years_text.val()
                        }, function(data, status) {
                          checkSession(data.error);
                          if (data != undefined && data.years != undefined) {
                            admin_main_home_years_text.text(data.years);
                            common_info.years = data.years;
                            admin_main_home_years_edit_btn.text("Edit");
                            admin_main_home_years_text.attr("disabled", "disabled");
                            admin_main_home_years_text.parent().removeClass("has-error");
                          } else {
                            admin_main_home_years_text.parent().addClass("has-error");
                          }
                          $("#process_dialog").hide();
                        });
                      } else {
                        admin_main_home_years_edit_btn.text("Save");
                        admin_main_home_years_text.removeAttr("disabled");
                        admin_main_home_years_edit_btn.attr("disabled", "disabled");
                      }
                    });
                // ----------------------------End---------------------------------

                // ------------------------Edit products---------------------------
                var admin_main_home_production_type_edit_btn = $("#admin_main_home_production_type_edit_btn");
                var admin_main_home_production_type_text = $("#admin_main_home_production_type_text");
                admin_main_home_production_type_edit_btn.removeAttr("disabled");
                admin_main_home_production_type_text.keyup(function() {
                  admin_main_home_production_type_edit_btn
                      .removeAttr("disabled");
                });
                admin_main_home_production_type_edit_btn
                    .click(function(event) {
                      if (admin_main_home_production_type_edit_btn.text() == "Save") {
                        $("#process_dialog").show();
                        $.post("/admin/updateProductionType", {
                          productiontype : admin_main_home_production_type_text.val()
                        }, function(data, status) {
                          checkSession(data.error);
                          if (data != undefined
                              && data.productiontype != undefined) {
                            admin_main_home_production_type_text.text(data.productiontype);
                            common_info.types = data.productiontype;
                            admin_main_home_production_type_edit_btn.text("Edit");
                            admin_main_home_production_type_text.attr("disabled", "disabled");
                            admin_main_home_production_type_text.parent().removeClass("has-error");
                          } else {
                            admin_main_home_production_type_text.parent().addClass("has-error");
                          }
                          $("#process_dialog").hide();
                        });
                      } else {
                        admin_main_home_production_type_edit_btn.text("Save");
                        admin_main_home_production_type_text.removeAttr("disabled");
                        admin_main_home_production_type_edit_btn.attr("disabled", "disabled");
                      }
                    });
                // ----------------------------End---------------------------------

                // ------------------------Edit brands-----------------------------
                var admin_main_home_brand_edit_btn = $("#admin_main_home_brand_edit_btn");
                var admin_main_home_brand_text = $("#admin_main_home_brand_text");
                admin_main_home_brand_edit_btn.removeAttr("disabled");
                admin_main_home_brand_text.keyup(function() {
                  admin_main_home_brand_edit_btn.removeAttr("disabled");
                });
                admin_main_home_brand_edit_btn
                    .click(function(event) {
                      if (admin_main_home_brand_edit_btn.text() == "Save") {
                        $("#process_dialog").show();
                        $.post("/admin/updateBrand", {
                          brands : admin_main_home_brand_text.val()
                        }, function(data, status) {
                          checkSession(data.error);
                          if (data != undefined && data.brands != undefined) {
                            admin_main_home_brand_text.text(data.brands);
                            common_info.brands = data.brands;
                            admin_main_home_brand_edit_btn.text("Edit");
                            admin_main_home_brand_text.attr("disabled", "disabled");
                            admin_main_home_brand_text.parent().removeClass("has-error");
                          } else {
                            admin_main_home_brand_text.parent().addClass("has-error");
                          }
                          $("#process_dialog").hide();
                        });
                      } else {
                        admin_main_home_brand_edit_btn.text("Save");
                        admin_main_home_brand_text.removeAttr("disabled");
                        admin_main_home_brand_edit_btn.attr("disabled", "disabled");
                      }
                    });
                // ----------------------------End---------------------------------

                // ----------------Get config data from backend--------------------
                $.get(
                        "/admin/main",
                        function(data, status) {
                           checkSession(data.error);
                           if (data != undefined && data.responce != undefined
                              && data.responce.length > 0) {
                            var admin_main_home_data = {};
                            data.responce.forEach(function(item) {
                              admin_main_home_data[item.index] = item.value;
                            });
                            if (admin_main_home_data.years != undefined) {
                              admin_main_home_years_text
                                  .val(admin_main_home_data.years);
                              common_info.years = admin_main_home_data.years;
                            }
                            if (admin_main_home_data.productiontype != undefined) {
                              admin_main_home_production_type_text
                                  .val(admin_main_home_data.productiontype);
                              common_info.types = admin_main_home_data.productiontype;
                            }
                            if (admin_main_home_data.brands != undefined) {
                              admin_main_home_brand_text
                                  .val(admin_main_home_data.brands);
                              common_info.brands = admin_main_home_data.brands;
                            }
                          }
                          setTimeout(function() {
                            $("#process_dialog").hide();
                          }, 100);
                        });
                // ----------------------------End---------------------------------
              }
            });
  }
  
  function execProduct(event) {
    var param = {};
    var page  = 0;
    if(event!=undefined&&event.currentTarget!=undefined&&event.currentTarget.tagName=="LI")
      changeTabStatus(event.currentTarget);
    if(event!=undefined&&event.param!=undefined) {
      param.year = event.param.year==undefined?undefined:event.param.year;
      param.type = event.param.type==undefined?undefined:event.param.type;
      param.brand = event.param.brand==undefined?undefined:event.param.brand;
    }
    if(event!=undefined&&event.page!=undefined) {
      page = event.page;
    }
    var header = $("#admin_main_sub_menu");
    $("#process_dialog").show();
    $("#admin_main_panel_header").text(admin.product);
    $("#admin_main_div").empty();
    $("#admin_main_div").load("/template/admin_main/admin_main_product.html",
        null, function(responseTxt, statusTxt, xhr) {
      $("#admin_main_product_panel").ready(function(e){
          $("#admin_main_product_new").click(function() {
            showProductItemDialog({
              title : "New Production",
              type : "new"
            });
          });
          });
          $.post("/admin/product", {param:param,page:page} , function(data, status) {
            checkSession(data.error);
            console.log(data);
            // initialization start
            // product list 
            if( data.data != undefined ) {
              data.data.forEach(function(item){
                $("#admin_main_product_list").append(
                    '<tr class="admin_main_product_list_col">'+
                      '<input type="hidden" value="'+item._id+'">'+
                      '<td >'+
                        '<div class="checkbox">'+
                           '<label>'+
                              '<input type="checkbox">'+
                           '</label>'+
                         '</div>'+
                      '</td>'+
                      '<td >'+item.year+'</td>'+
                      '<td >'+item.type+'</td>'+
                      '<td >'+item.brand+'</td>'+
                      '<td >'+item.Production_Name+'</td>'+
                      '<td class="admin_main_product_list_col_image"><span class="glyphicon glyphicon-picture"></span></td>'+
                      '<td class="admin_main_product_list_col_image"><span class="glyphicon glyphicon-wrench"></span></td>'+
                      '<td class="admin_main_product_list_col_image"><span class="glyphicon glyphicon-cog"></span></td>'+
                     '</tr>"');
              });
            }
            
            if(data.first==true) {
              $("#admin_main_product_btn_previous").parent().addClass("disabled");
            }else{
              $("#admin_main_product_btn_previous").parent().removeClass("disabled");
              $("#admin_main_product_btn_previous").click(function(e){
                e.param = param;
                e.page  = page - 1;
                execProduct(e);
              });
            }
            
            if(data.last==true) {
              $("#admin_main_product_btn_next").parent().addClass("disabled");
            }else{
              $("#admin_main_product_btn_next").parent().removeClass("disabled");
              $("#admin_main_product_btn_next").click(function(e){
                e.param = param;
                e.page  = page + 1;
                execProduct(e);
              });
            }
            
            $("#admin_main_product_list_checkbox").click(function(e){
              var checkedOfAll=$("#admin_main_product_list_checkbox")[0];
              $("input[type='checkbox']:gt(0)").each(function(index,item) {
                item.checked=checkedOfAll.checked;
              });
              if(checkedOfAll.checked)
                $("#admin_main_product_delete").removeClass("disabled");
              else
                $("#admin_main_product_delete").addClass("disabled");
            });
            $("input[type='checkbox']:gt(0)").click(function(e) {
              var check = false;
              $("input[type='checkbox']:gt(0)").each(function(index,item){
                if(item.checked==true)
                  check = true;
              });
              if(check)
                $("#admin_main_product_delete").removeClass("disabled");
              else
                $("#admin_main_product_delete").addClass("disabled");
            });
            $("#admin_main_product_delete").click(function(e){
              var css = $("#admin_main_product_delete").hasClass("disabled"); 
              if(!css) {
                var list = $("#admin_main_product_list tr input[type='checkbox']:checked");
                var deleteList = {};
                list.each(function(index,item){
                  var val= $(item).parents("tr").children("input[type='hidden']").val();
                  if(val != undefined) {
                    deleteList[index]=val;
                  }
                });
                if(deleteList.length>0) {
                  $.post("/admin/delProduct", {delList : deleteList}, function(data, status) {
                    
                  });
                }
                e.param = param;
                e.page  = page;
                execProduct(e);
              }
            });
            var years = common_info.years.split(",");
            years.sort(function(a,b){return a<b?1:-1});
            $("#admin_main_product_list_years button")[0].innerHTML=(param.year==undefined)?
                " Year <span class='caret'></span>":" "+param.year+"  <span class='caret'></span>";
            $("#admin_main_product_list_years_ul").append('<li><a href="#">Years</a></li>');
            years.forEach(function(item){
              $("#admin_main_product_list_years_ul").append('<li><a href="#">'+item+'</a></li>');
            });
            var types = common_info.types.split(",");
            types.sort(function(a,b){return a<b?1:-1});
            $("#admin_main_product_list_types button")[0].innerHTML=(param.type==undefined)?
                " Type <span class='caret'></span>":" "+param.type+"  <span class='caret'></span>";
            $("#admin_main_product_list_types_ul").append('<li><a href="#">Types</a></li>');
            types.forEach(function(item){
              $("#admin_main_product_list_types_ul").append('<li><a href="#">'+item+'</a></li>');
            });
            var brands = common_info.brands.split(",");
            brands.sort(function(a,b){return a<b?1:-1});
            $("#admin_main_product_list_brands button")[0].innerHTML=(param.brand==undefined)?
                " Brand <span class='caret'></span>":" "+param.brand+"  <span class='caret'></span>";
            $("#admin_main_product_list_brands_ul").append('<li><a href="#">Brands</a></li>');
            brands.forEach(function(item){
              $("#admin_main_product_list_brands_ul").append('<li><a href="#">'+item+'</a></li>');
            });
            $("#admin_main_product_list_years ul li a").click(function(e){
              $("#admin_main_product_list_years button")[0].innerHTML=" "+e.currentTarget.innerHTML+" <span class='caret'></span>";
              param.year = e.currentTarget.innerHTML=="Years"?undefined:e.currentTarget.innerHTML;
              e.param = param;
              execProduct(e);
            });
            $("#admin_main_product_list_types ul li a").click(function(e){
              $("#admin_main_product_list_types button")[0].innerHTML=" "+e.currentTarget.innerHTML+" <span class='caret'></span>";
              param.type = e.currentTarget.innerHTML=="Types"?undefined:e.currentTarget.innerHTML;
              e.param = param;
              execProduct(e);
            });
            $("#admin_main_product_list_brands ul li a").click(function(e){
              $("#admin_main_product_list_brands button")[0].innerHTML=" "+e.currentTarget.innerHTML+" <span class='caret'></span>";
              param.brand = e.currentTarget.innerHTML=="Brands"?undefined:e.currentTarget.innerHTML;
              e.param = param;
              execProduct(e);
            });
            // initialization end
            setTimeout(function() {
              $("#process_dialog").hide();
            }, 100);
        });
     });
  }

  function show_Btn(e) {
    $(e.currentTarget).find(".admin_main_product_item_image_btn").removeClass(
        "hidden");
  }

  function hide_Btn(e) {
    $(e.currentTarget).find(".admin_main_product_item_image_btn").addClass(
        "hidden");
  }

  function remove_Btn(e) {
    $("#admin_main_update_modal").children("input[type='hidden']:hidden").each(function(index, item){
      if(item.value==$(e.currentTarget).parent().parent().attr("value"))
        $(item).remove();
    });
    $(e.currentTarget).parent().parent().remove();
  }

  function showProductItemDialog(data) {
    $("#admin_main_product_dialog_div")
        .load(
            "/template/admin_main/admin_main_product_item.html",
            null,
            function(responseTxt, statusTxt, xhr) {
              // ----upload images----
              $("#image_list")
                  .append(
                      '<div id="admin_main_product_item_new_btn" class="col-xs-3 admin_main_product_item_image">'
                          + '<a href="#" class="thumbnail">'
                          + '<img src="/images/noimage.jpg" alt="...">'
                          + '<div id="admin_main_product_item_image_add" class="admin_main_product_item_image_btn hidden" onclick="admin_main_product_item_uploadfile.click()">+</div>'
                          + '<input class="hidden" id="admin_main_product_item_uploadfile" type="file" accept="image/*">'
                          + '</a>' + '</div>');
              $("#admin_main_product_item_new_btn").mouseover(show_Btn);
              $("#admin_main_product_item_new_btn").mouseout(hide_Btn);
              // start uploadfile
              $("#admin_main_product_item_uploadfile")
                  .change(
                      function(event) {
                        if (event.currentTarget.files == undefined
                            || event.currentTarget.files[0] == undefined) {
                          return;
                        }
                        var file = event.currentTarget.files[0];
                        var reader = new FileReader();
                        reader.onload = function(evt) {
                          var img = document.createElement("img");
                          img.src = evt.target.result;
                          img.onload = function() {
                            var canvas = document.createElement("canvas");
                            if (img.naturalWidth / img.naturalHeight > 1) {
                              var double = img.naturalWidth / 480;
                              canvas.width = 480;
                              canvas.height = img.naturalHeight / double;
                            } else {
                              var double = img.naturalHeight / 320;
                              canvas.width = img.naturalWidth / double;
                              canvas.height = 320;
                            }
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0, canvas.width,
                                canvas.height);
                            var img_data = canvas.toDataURL("image/jpeg");
                            $("#admin_main_product_item_new_btn")
                                .before(
                                    '<div class="col-xs-3 admin_main_product_item_image">'
                                        + '<a href="#" class="thumbnail" >'
                                        + '<img src="' + img_data + '" style="height:86px;padding-top:' + (320 - canvas.height) / 320 * 86 / 2
                                        + 'px;padding-bottom:' + (320 - canvas.height) / 320 * 86 / 2 + 'px">'
                                        + '<div class="admin_main_product_item_image_btn hidden" >-</div>'
                                        + '</a>' + '</div>');
                            $("#admin_main_product_item_new_btn").prev().mouseover(show_Btn);
                            $("#admin_main_product_item_new_btn").prev().mouseout(hide_Btn);
                            $("#admin_main_product_item_new_btn").prev().children().children("div").click(remove_Btn);
                            // post file into server
                            $("#process_dialog").show();
                            $.post("/admin/updateImage", {
                              imgData : img_data
                            }, function(data, status) {
                              checkSession(data.error);
                              if (data.error) {
                                $("#admin_main_product_item_new_btn").prev()
                                    .children("a").css({
                                      "border" : "1px solid #f00"
                                    });
                                $("#admin_main_product_item_new_btn").prev()
                                    .children("a").children("div")
                                    .text("Error").removeClass("hidden");
                                setTimeout(function() {
                                  $("#admin_main_product_item_new_btn").prev()
                                      .remove();
                                }, 2000);
                              } else {
                                $("#admin_main_product_item_new_btn").prev()
                                    .children("a").css({
                                      "border" : "1px solid #05f005"
                                    });
                                $("#admin_main_product_item_new_btn").prev().attr("value",data.path);
                                $("#admin_main_update_modal").append(
                                    '<input type="hidden" name="files" value="'+data.path+'">');
                              }
                              $("#process_dialog").hide();
                            });
                          }
                        }
                        reader.readAsDataURL(file);
                      });
              // end uploadfile
              // ----upload images----
              
              // ----initilization----
              var years = common_info.years.split(",");
              years.sort(function(a,b){return a<b?1:-1});
              var yearSelect = $("#admin_main_product_item_years")[0];
              yearSelect.options.length=0;
              years.forEach(function(item){
                var varItem = new Option(item, item); 
                try{
                  yearSelect.add(varItem,null);
                }catch(e){
                  yearSelect.add(varItem);
                }
              });
              var productType = common_info.types.split(",");
              var productTypeSelect = $("#admin_main_product_item_types")[0];
              productTypeSelect.options.length=0;
              productType.forEach(function(item){
                var varItem = new Option(item, item); 
                try{
                  productTypeSelect.add(varItem,null);
                }catch(e){
                  productTypeSelect.add(varItem);
                }
              });
              var brand = common_info.brands.split(",");
              var brandSelect = $("#admin_main_product_item_brands")[0];
              brandSelect.options.length=0;
              brand.forEach(function(item){
                var varItem = new Option(item, item); 
                try{
                  brandSelect.add(varItem,null);
                }catch(e){
                  brandSelect.add(varItem);
                }
              });

              var fields = [
                              {key:"Production Name",   name:"Production_Name", placeholder:"Production Name"   }
                            , {key:"Prices",            name:"Prices",          placeholder:"Prices"            }
                            , {key:"Frame",             name:"Frame",           placeholder:"Frame"             }
                            , {key:"Fork",              name:"Fork",            placeholder:"Fork"              }
                            , {key:"Brake Calipers",    name:"Brake_Calipers",  placeholder:"Brake Calipers"    }
                            , {key:"Chain",             name:"Chain",           placeholder:"Chain"             }
                            , {key:"Crankset",          name:"Crankset",        placeholder:"Crankset"          }
                            , {key:"Front Derailleur",  name:"Front_Derailleur",placeholder:"Front Derailleur"  }
                            , {key:"Rear Derailleur",   name:"Rear_Derailleur", placeholder:"Rear Derailleur"   }
                            , {key:"Shifters",          name:"Shifters",        placeholder:"Shifters"          }
                            , {key:"Sassete",           name:"Sassete",         placeholder:"Sassete"           }
                            , {key:"Handlebar",         name:"Handlebar",       placeholder:"Handlebar"         }
                            , {key:"Wheels",            name:"Wheels",          placeholder:"Wheels"            }
                            , {key:"Saddle",            name:"Saddle",          placeholder:"Saddle"            }
                            , {key:"Seatpost",          name:"Seatpost",        placeholder:"Seatpost"          }
                            , {key:"Stem",              name:"Stem",            placeholder:"Stem"              }
                            , {key:"Headset",           name:"Headset",         placeholder:"Headset"           }
                            ];
              fields.forEach(function(item){
                $("#admin_main_update_modal_fields").append(
                    '<tr>'+
                    '<td>'+item.key+'</td>'+
                    '<td><input type="text" name="'+item.name+'" class="form-control input-sm" placeholder="'+item.placeholder+'"></td>'+
                    '</tr>');
              });
              // ----initilization----
              $("#admin_main_product_dialog_title").text(data.title);
              $("#admin_main_product_dialog").on("hide.bs.modal", function(e) {
                $("#admin_main_product_dialog_div").empty();
              });
              $("#admin_main_product_dialog").on("hidden.bs.modal",
                  function(e) {
                    $("#admin_main_product_dialog_div").empty();
                  });
              $("#admin_main_product_dialog").modal({
                show : true
              });
              $("#admin_main_product_dialog_save").click(function(event){
                var data = $("#admin_main_update_modal").serialize();
                $.post("/admin/newProduct",
                  data,function(result,status){
                  checkSession(result.error);
                  if(result.error){
                    
                  }else{
                    $("#admin_main_product_dialog").modal('hide');
                  }
                });
              });
            });
  }

  function execUser(event) {
    changeTabStatus(event.currentTarget);
    $("#process_dialog").show();
    $.get("/admin/main", function(data, status) {
      checkSession(data.error);
      setTimeout(function() {
        $("#process_dialog").hide();
      }, 3000);
    });
  }

  function execSystem(event) {
    changeTabStatus(event.currentTarget);
    $("#process_dialog").show();
    $.get("/admin/main", function(data, status) {
      checkSession(data.error);
      setTimeout(function() {
        $("#process_dialog").hide();
      }, 3000);
    });
  }
})();