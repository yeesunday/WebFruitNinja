#!/bin/bash

python convert_obj_three.py -i apple/apple.obj -o apple/apple.js

python convert_obj_three.py -i banana/banana.obj -o banana/banana.js
python convert_obj_three.py -i banana/banana_half_top.obj -o banana/banana_half_top.js
python convert_obj_three.py -i banana/banana_half_bottom.obj -o banana/banana_half_bottom.js

python convert_obj_three.py -i kiwi/kiwi.obj -o kiwi/kiwi.js
python convert_obj_three.py -i kiwi/kiwi_half.obj -o kiwi/kiwi_half.js

python convert_obj_three.py -i orange/orange.obj -o orange/orange.js
python convert_obj_three.py -i orange/orange_half.obj -o orange/orange_half.js

python convert_obj_three.py -i pear/pear.obj -o pear/pear.js
python convert_obj_three.py -i pear/pear_half.obj -o pear/pear_half.js

python convert_obj_three.py -i strawberry/strawbarry.obj -o strawberry/strawbarry.js
python convert_obj_three.py -i strawberry/strawbarry_half.obj -o strawberry/strawbarry_half.js

python convert_obj_three.py -i watermelon/watermelon.obj -o watermelon/watermelon.js
python convert_obj_three.py -i watermelon/watermelon_half.obj -o watermelon/watermelon_half.js
