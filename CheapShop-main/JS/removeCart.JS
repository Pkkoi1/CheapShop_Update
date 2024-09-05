$('.cart_product-item-remove').on('click', function() {
    $(this).closest('tr').remove();
    if($('#cart_product-table tbody tr').length === 0)
    {
        $('#cart_product-table tbody').append('<div>Không có sản phẩm</div>');
        $('thead input[type="checkbox"]').prop('checked', false);
    }
   
  });

