/*
 * key  : value
 * name | callback
 */
var tabs = { // name : url
  Home : execHome,
  Production : execProduct,
  User : execUser,
  System : execSystem
};

/*
 * admin_onload : entry function
 */
function admin_onload(dom) {
  admin_main_controller();
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
  $("#admin_main_div").load("/template/admin_main/admin_main_home.html", null,
      function(responseTxt, statusTxt, xhr) {
        if (statusTxt == "error")
          alert("Error: " + xhr.status + ": " + xhr.statusText);
        else {
          // ------------------------Edit Years------------------------------
          var admin_main_home_years_edit_btn = $("#admin_main_home_years_edit_btn");
          var admin_main_home_years_text     = $("#admin_main_home_years_text");
          admin_main_home_years_edit_btn.removeAttr("disabled");
          admin_main_home_years_text.keyup(function(){
            admin_main_home_years_edit_btn.removeAttr("disabled");
          });
          admin_main_home_years_edit_btn.click(function(event) {
            if(admin_main_home_years_edit_btn.text() == "Save") {
              $("#process_dialog").show();
              $.post("/admin/updateYears",
                  {
                    years:admin_main_home_years_text.val()
                  },
                  function(data,status){
                    if(data!=undefined&&data.years!=undefined){
                      admin_main_home_years_text.text(data.years);
                      admin_main_home_years_edit_btn.text("Edit");
                      admin_main_home_years_text.attr("disabled","disabled");
                      admin_main_home_years_text.parent().removeClass("has-error");
                    }else{
                      admin_main_home_years_text.parent().addClass("has-error");
                    }
                    $("#process_dialog").hide();
              });
            }else{
              admin_main_home_years_edit_btn.text("Save");
              admin_main_home_years_text.removeAttr("disabled");
              admin_main_home_years_edit_btn.attr("disabled", "disabled");
            }
          });
          // ----------------------------End---------------------------------
          
          // ------------------------Edit products---------------------------
          var admin_main_home_production_type_edit_btn = $("#admin_main_home_production_type_edit_btn");
          var admin_main_home_production_type_text     = $("#admin_main_home_production_type_text");
          admin_main_home_production_type_edit_btn.removeAttr("disabled");
          admin_main_home_production_type_text.keyup(function(){
            admin_main_home_production_type_edit_btn.removeAttr("disabled");
          });
          admin_main_home_production_type_edit_btn.click(function(event) {
            if(admin_main_home_production_type_edit_btn.text() == "Save") {
              $("#process_dialog").show();
              $.post("/admin/updateProductionType",
                  {
                    productiontype:admin_main_home_production_type_text.val()
                  },
                  function(data,status){
                    if(data!=undefined&&data.productiontype!=undefined){
                      admin_main_home_production_type_text.text(data.productiontype);
                      admin_main_home_production_type_edit_btn.text("Edit");
                      admin_main_home_production_type_text.attr("disabled","disabled");
                      admin_main_home_production_type_text.parent().removeClass("has-error");
                    }else{
                      admin_main_home_production_type_text.parent().addClass("has-error");
                    }
                    $("#process_dialog").hide();
              });
            }else{
              admin_main_home_production_type_edit_btn.text("Save");
              admin_main_home_production_type_text.removeAttr("disabled");
              admin_main_home_production_type_edit_btn.attr("disabled", "disabled");
            }
          });
          // ----------------------------End---------------------------------
          
          // ------------------------Edit brands-----------------------------
          var admin_main_home_brand_edit_btn = $("#admin_main_home_brand_edit_btn");
          var admin_main_home_brand_text     = $("#admin_main_home_brand_text");
          admin_main_home_brand_edit_btn.removeAttr("disabled");
          admin_main_home_brand_text.keyup(function(){
            admin_main_home_brand_edit_btn.removeAttr("disabled");
          });
          admin_main_home_brand_edit_btn.click(function(event) {
            if(admin_main_home_brand_edit_btn.text() == "Save") {
              $("#process_dialog").show();
              $.post("/admin/updateBrand",
                  {
                    brands:admin_main_home_brand_text.val()
                  },
                  function(data,status){
                    if(data!=undefined&&data.brands!=undefined){
                      admin_main_home_brand_text.text(data.brands);
                      admin_main_home_brand_edit_btn.text("Edit");
                      admin_main_home_brand_text.attr("disabled","disabled");
                      admin_main_home_brand_text.parent().removeClass("has-error");
                    }else{
                      admin_main_home_brand_text.parent().addClass("has-error");
                    }
                    $("#process_dialog").hide();
              });
            }else{
              admin_main_home_brand_edit_btn.text("Save");
              admin_main_home_brand_text.removeAttr("disabled");
              admin_main_home_brand_edit_btn.attr("disabled", "disabled");
            }
          });
          // ----------------------------End---------------------------------
          
          // ----------------Get config data from backend--------------------
          $.get("/admin/main", function(data, status) {
            if(data!=undefined&&data.responce!=undefined&&data.responce.length>0) {
              var admin_main_home_data = {};
              data.responce.forEach(function(item){
                admin_main_home_data[item.index] = item.value;
              });
              if(admin_main_home_data.years!=undefined){
                admin_main_home_years_text.val(admin_main_home_data.years);
              }
              if(admin_main_home_data.productiontype!=undefined){
                admin_main_home_production_type_text.val(admin_main_home_data.productiontype);
              }
              if(admin_main_home_data.brands!=undefined){
                admin_main_home_brand_text.val(admin_main_home_data.brands);
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
  changeTabStatus(event.currentTarget);
  var header = $("#admin_main_sub_menu");
  $("#process_dialog").show();
  $("#admin_main_panel_header").text(admin.product);
  $("#admin_main_div").empty();
  $("#admin_main_div").load("/template/admin_main/admin_main_product.html", null,
      function(responseTxt, statusTxt, xhr) {
        $("#admin_main_product_new").click(function(){
          showProductItemDialog({title:"New Production",type:"new"});
        });
        $.get("/admin/product", function(data, status) {
          setTimeout(function() {
            $("#process_dialog").hide();
          }, 100);
        });
  });
}

function showProductItemDialog(data) {
  $("#admin_main_product_dialog_div").load("/template/admin_main/admin_main_product_item.html", null,
      function(responseTxt, statusTxt, xhr) {
        $("#image_list").append('<div id="admin_main_product_item_new_btn" class="col-xs-3 admin_main_product_item_image">'+
            '<a href="#" class="thumbnail"><img src="/images/noimage.jpg" alt="...">'+
            '</a></div>');
        $("#admin_main_product_item_new_btn").mouseover(function(event){
          
        });
        $("#admin_main_product_dialog_title").text(data.title);
        $('#admin_main_product_dialog').on('hide.bs.modal', function (e) {
          // save information
        });
        $('#admin_main_product_dialog').on('hidden.bs.modal', function (e) {
          $("#admin_main_product_dialog_div").empty();
        });
        $("#admin_main_product_dialog").modal({
          show:true
        });
  });
}

function execUser(event) {
  changeTabStatus(event.currentTarget);
  $("#process_dialog").show();
  $.get("/admin/main", function(data, status) {
    setTimeout(function() {
      $("#process_dialog").hide();
    }, 3000);
  });
}

function execSystem(event) {
  changeTabStatus(event.currentTarget);
  $("#process_dialog").show();
  $.get("/admin/main", function(data, status) {
    setTimeout(function() {
      $("#process_dialog").hide();
    }, 3000);
  });
}

function addNewItem() {
  console.log('add new item');
}