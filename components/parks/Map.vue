<template>
  <div>
    <radio-svg-map
      v-model="selectedLocation"
      :map="map"
      :location-class="getLocationClass"
      @mouseover="pointLocation"
      @mouseout="unpointLocation"
      @mousemove="moveOnLocation"
      @focus="focusLocation"
      @blur="blurLocation"
    >
      <template #before>
        <svg viewBox="0 0 920 400" preserveAspectRatio="xMinYMin">
          <g opacity="0.3">
            <image
              enable-background="new"
              width="920"
              height="400"
              xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2cAAAF5CAYAAAAbCFKnAAAACXBIWXMAAAsSAAALEgHS3X78AAAA
                        BGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAN5HSURB
                        VHja7L0Jd+NYjv0JkpLtWDKz1q6Zqu//0WbO9L+7qyozVlsSOaFqonR5BeA9arEWA+fwyGE7bJl8
                        fMQPy4VIWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpa
                        WlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpa
                        WlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpa
                        WlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpa
                        WlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpa
                        WlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpa
                        WlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlraYdbkKUi7ZvvrX/5WvUb/
                        3//8f4Y8Y2lpaWlpaWlpaQlnaWmng67mgLU6jEdCWlpaWlpaWlpaWsJZWlolhDXO+mtmfoxQxkdC
                        WlpaWlpaWlpaWsJZWhpAWWPAmPXazPhetH6Ese3rBj7+F6QloKWlpaWlpaWlpSWcpd0bZB2ytvRo
                        C/+ec6ApiK1HMNPXzfj57ZEZtLS0tLS0tLS0tJuwRZ6CtADIrGxVQ3DEH+vXWzo643MNvVqfZ6Cz
                        wGw1Hi/jgd8z3MF1qLKE0LS0tLS0tLS0hLO0+wWyUuYKAQjBAIFseyzHtbaAz3UOvHUBvOHvVzDb
                        wtjzj+P7+D0Mb8MNXgNx4Ng7//96Hf9/9tulpaWlpaWlpd2oZVljmkKBlaXibBYD2gAQ1BOcKZRt
                        j4cfx+P46oEaQ1sndhZNf+9mBLMtlH39cXwej+3H30Zg0zLHq+09IyBrCnAsYmcuJ312ciX9dvq3
                        JSimpaWlpaWlpSWcpc2HMsxaedDUEJjt9XiN36dQ9vTjeDceTwBpC4I0fm0dOFQQWY1g9uXH8duP
                        49fx9bfxc9/G71nLFfaeGYIpXk+eBccNgVgP12AiinLKv7myzDL6nr33kuCWlpaWlpaWlpZw9toO
                        +NU5oQBmDGMKTJr10o8R0ATAbA3HhuBsC2Mffhwfx9cPI6Q90s/vDFDT99QYULj9Pc8AZv/4cfx9
                        PP45fu6r7LJnnNm76PVwMpVRiWcXQGpP1wBFUayS01PtEbVjECw4GwjwE9TS0tLS0tLS0hLOTgtg
                        lefVdUBfyzklMMO+MCxB1ONBduWIDGcqxqFCHKvx8+34f97/OH76cfw8Hj+NgPYEgFaTOcOyPsya
                        fRrB7H9+HP/nx/Hf48f/HMHt+/i9Hqi8+rUgMOMM5cI48Jx0BGcbugbPcB3WMwHtkJlzIuXSS3GA
                        rJf9cswEtLS0tLS0tLSEs7SjgCyazVWCsyH43Fkc1fG9Y4ZmAQCGJYhYivgku1LEliBJxTi+j2Cw
                        Gb/ncQSxX34cvxuP7ccfZZo9WxCceJkiBJLt79lmxn4bYey/fhz/3who/zUC27b/7Bu8p94AlcGB
                        tNK/j73n+PwvAYCxN4979Pj8Y9/d9/Hv/QaQxlnDoRLKItgqCcaUxh5gGSaWw+ZsurS0tLS0tLSE
                        szwFB8FN1CNUAjQLELzPnRTWCMzU2X8EKNPSQyxDfC/TTJfCAQtyaBnhSnaZs48jlP3hx/H78eOP
                        48/Un+cJgVjnVJ16LWnc9plts2X/OcLZf46A9o8R3L4BpOwNqA7OfxGcD4Q27O3rZJqpfCIYxv48
                        hDSGY4WyLyOQfoFroX97lD2bC1sl8Rhv7MEAMKbllyuZlmLmbLq0tLS0tLS0N20ppX84lJXmd5Vk
                        563Srt74nn8fx0ilG2CmWZp3AGQ/y7QEUSHtnQFnKmP/DaBARTjEgLM/jB//NP48LpVsAwcfBTDW
                        I3i04/l6HmFEoeS77HrfFjJVbdzL0hTOuVRAXC2kcSkjgvF7AuP3BMWPBpxt4Pxr7x1m3b7KrsRx
                        r+dO9rNhNbBV2yvXiD3WYC3T8Qf6yvdKnztOWlpaWlpaWsJZWg2YWeIZ2B8UAZpV2tUbH/cGSPQe
                        qJVgzQEzhIItjG1LDjW79TuZ9ogpnOnfiJDEMvbP469djqDxi+wyZ1jWiGWSrdhZSIQIdPBbeA+a
                        uUP5fF3b7wACsIxuU3GOQ1B2AC4CMzGuwTux+/LwvGMGrSM40/P/iWBOs3Hcc1cDZhFs8TXqZL9v
                        Dv8/wtZGdr1xWn751YC47dH8WLOZPUtLS0tLS0tLOEtzwYzLAbUkDQ+ENO6VEnD4ERLW9MofWzAR
                        ZtUMMGgcMFMo+L3sslsKUizggTDFcKZZny/j54bx97wff472m/0MP29Jzj+XzTFEKDB1ACfvAC5f
                        AMz0d38DQMFzupkJayEoVy4lLGnUrNl7ANjfERh/lP2S0gWcEz3/X2Tax6fZuM8y7QO04MwbpeDB
                        VmvAGQua8DVFqMZM32fZZWItIJYEtLS0tLS0tLSEszQPzFC8QR1g7hOySvUYLnqCMOy94VeWR18b
                        MOFlc9ARx6HQCGaa1frjePyJ4IzFOzoDzvDvfw9w1o1f+0n2s3AP4JhbAhJev14/fq0f39Nq/Jma
                        HVIweyfTbNoKvseD4I3E2UsP4GoBDQFfM1sfAF4VkFE45YNMSxU7AB6FnS8Acdg76MGZBcE1sFWC
                        Mx6DwCMXtD9OhVweYS3xOdVr3VtBhwS2tLS0tLS0tISzBDNVNXwn++IZ7wFSHmQ/e4ZOvAVmLxWv
                        noDCpgAL6ihjj5mCmULZn0cwUzj7Zfye97KfNUM4YGXBd+N71QzXo+wLi2iWkYdaR1CmTr4685gB
                        1L9f1/PTeE2+AZysHNBdS5xRY5jmbNtcOGsIkhHO/mDAGQqnWOf/Raalj3p9P8p0lEAv+5mzEpxZ
                        sDUnc8YjF1Q85tP4HhcAYRu6jo1My1cnJaRzSnrT0tLS0tLS0hLO7sewHPABoAx7hLysEPYHqZPK
                        WTMGMO2P0o+f6XMvAWwgMPT0/jt6/5ox+9MIZgpnf5RdWR3OI0PYFIBM7LdT+FsBnC1lKsnP56ZG
                        3VJ/n9W39Qh/K85W+0bnTc/1xoGztfiljlGWDc/1UFhHQqD/BGtJ+/20Lw/P/wNBD57/lUwVHbFU
                        EnvweuO9WAIftZkz7k/zxiAgfD2P7+n9+F4bClZs4Drrz2EA9oRyJEEtLS0tLS0tLeHsTo2yZpil
                        4TI0FdCw5nd5cMZS4isCL4QynV/1DK/6PSsHPDCLZvU46fvXjNl/yC5r9nsAg3cOTCEcsIP+IDvp
                        9kb2h1pbYFYzzqGBn6l/E2ZTWgCe5wLEWn1+Hpyh9Lv1fXPhjK+HZrl+BiiLyknxXG1kfwbaA/zM
                        Z/j7a/rNmgrYskRb8Hv4e1FhU2fTPcD121BwQc/PM6xprxfQLOtVUEtIS0tLS0tLS0s4ux/zyhlV
                        vAF7tHh+F/cHNQacbQJAs+CMDyujtiaHFrMQDwCXmqVROPvz+LGlpuiBgeXca6bMAsPlEWBmAZpe
                        G7xWmLlbV4LXhoDN6i0rZc7mioJ4ipk8uuBJpuWMLf0sK8ul6xTBjPvNmgKkRbDVSFlSn2X0cVj2
                        o0wFXdYyzewptJZEXCyAnoi1pJhIWlpaWlpaWsLZHdiYNRPxRTQUbDTj9EexJeItOBsMOGBAWzmA
                        9k3sTNoz/D/LIbdKGn8v+wIgUfaPQWogBxxBDEvoEHA745wcAs0IJ40Bgb2UlRhZ5MNz8r0M2iGC
                        IGK8X4XmdzIt/0Qws+B4ED/b9UhwOkgsBiKVsOWpaVoz0hCmNUP2AGDG57WRaXb3OwQcvMPLiv67
                        vPfHvfyv35+QlpaWlpaWlpZwdtvWEpyxsh72a6mAxgfZz3Z4c876AqRhD5qVRWM4Y0BDOMOZWp46
                        YFRKxxDG/V88ZqA3zqM1+6054vrw79cet0F8KXxr8HfNrDML5CyVzDlwxllZ7Bl7IDDz1CwHA4z0
                        5zFAigFn4nzegq0m+P9NAH0CcIZKk3heBcBMxzHo2saAgyeU82IEJxo4BynJn5aWlpaWlpZwdotm
                        DJu2hECw30yPnwlsEGowcyYOIDCklcodnw0ww1I27DNidUAUM1FVxg8FMCspKnKPkTjO/iHljB6Y
                        WbDoDYiOjr7y69Gcubnvn4eZc+8YZhnb4Lxb5Yj8HmvOoVTAVlP5Myw4w0AFvzfM7G7XIqpsvkh9
                        2S/fD1gy2SegpaWlpaWlpSWc3aaxs2sNbf4FDoSbqBRQHGDwQG3tgBo7qpaKI2bOWEZf1fy0v0nH
                        ADxUgJnlnDcGDFnfc4qMmThgZgGwOJ+zroE4f0MJ4uRAOEOg9Xq82sI54x68gWBucK5FBGq18Fb7
                        c/D8LAw4w3LG7Vr8KlPhGw/MtMz32/h/tseX8VXh9nn8fTqYPAEtLS0tLS0tLeHshgENM2faC6Nz
                        zX4iuEGZeA/MSpDmldJFA6tXBGUrmYpViEwFKHR4NvY4aSndYgaY1QDSHMf+mOtU8/nhwI89cBtO
                        9N6jMsIamLWyiLXA2Bz59ZrvY2DULJn+Pwx+fBQ7Y2bBmYLZl/H4NB6fx9eO3te/M8kou+9ZAlxa
                        WlpaWlpawtl1gVkTQM17OHCoMis0lpxbhgF2/j0BCyuzxsqEPcEZgiYfrAhYC2aWcz68ApAdCmtD
                        8D3DjH8PZ3i/pde5f3dzhnN46M9iQBMHzqzxBxyIsOBsC2O/yW5g98L4XWqlck8ZAa6JrnXCW1pa
                        WlpaWlrC2euDGfYDIZypmt6j2HLzc7NO+L0IaK2Uyx89ZUJW6ENA44Pl0o9x0Jsrv7alrw2F7x1e
                        6b3d0/m3AM0SRfFGH6wNQPtOcKaBEr0XraDHRCSk8lqa2dQcep2WlpaWlpaWcHZmg2g5w4zO6MJh
                        yqyod6gSYaksLxK28IQqLOez1N90jp6wW4Xzmq8Pr/g77+W8IqBxdtobe2BB2gsA2hfZF+IR457Q
                        37U+AM7CI0Et7ZafeTVrFp6N0d51lrWf91RaWlrC2dsGM0v5bgFgZpUCdnLcYOUaR90Tu4icRvw+
                        FuXwBgq/dTBLoHo9QBOZqlF24o8w4MHt2oOGfZ4o08/lvQL38lrissbBAbOasQv/BrV0KNPO8Hw6
                        y95FPztSd/XGaFj/72Rl4FGJcd5naWlpCWf391CzSsl4oC/C2aMDZ6eAslPBWvRAjJQTEzbSLgG1
                        rUx7I6OscGccOMKhl2n5o2bJNDv3ItPMmRQAzRPnsQZeT8By3Hdy+HXasc+qUwb6SuNQhsLPqhmH
                        EinZHnsv7D3vMmudlpaWcHY74NXM+DfDiQVlUdaMe7Ve07G1Pj8c8DMSzNIuAWk8n64JAgmc0UaI
                        w4wazjnbjP8HBUc2DpxZSpfeaAuEv7UDa5pJ+7ejms5jWuE5dqqgWVMAqxKcebMqecRHS/dObSXH
                        MXDmjjXJMRlpaWkJZ5cHsajEIvp6EzwE9YGDAiB8PIrda3YJ0KnJqiWEpd2KeRkzq7wRS3ZRtOe9
                        7DJkw/i17X37XXZjJkqz3xj8FMxwxiDOF1wRsCGo9eA8IgAe5UhWlLml2uTtPNeiURqHVGR4gY3o
                        53owhTMZUSSLS/m9jPcgx40eiRSM+T6TBLS0tLR7sat12MkBacQvy6uBrtoDpb23s8x+/+P4jx/H
                        //3j+Nt4/F8/jj/L/w6g/iBT+e4EoLS0eQ5Xqc8sgjQUCNkOoNY5Z7/Jbu7ZNwK2QcoZBK/PDYdg
                        6/EMB2fVNrLfnyZyXDahqfx4KJz3BLXrALOW4KcVv495jtAUA1+U9RLZ7/nEn2Up/XYOnPE9ewyg
                        RVls6z771+/LNZ2WlpZwdt4HVxRZ9D4ufT8/pCI4+90IYlsg++sIaVtY+8OP42f530j9g9hZtLS0
                        NNvhioaus0qj2dcFB5Y04vyzbwRmG2PfawwndXAA8AWA7NsIg9/owLJKdB57x2FlQKsZ4B4FoKz/
                        N1QcCWmXAzPNRGE5PYpNzRnPYoGZBX+NAVaW8q/IvjjWUqazMfFnWPftoXDG9+PaCZTgvfbv35fr
                        OS0t7Zbt6soanYgiS793xtdbB7zawkOKZea1ROrjCGfb7Nkv47910C0/nBLK0tLmgZknmb+pdPIw
                        C6b3rcDH72QqDDKQ8xrBmeUQ4nw1BcCv8KoHZtTYceRyx17iLFoEYFFgCq1UKpo9O5cFMxadika1
                        1AAaBxutckSvJJEDIULPRey7ZpVUDJbg/euNd6ndL/TnIpRpcKST/bEzvZxvHmVaWlra24Oz8cGF
                        ELWQ/ahiJ9PIIj+A2gDIuuD7rP6Vn0c4+53sMmUq4Z3ZsrS0eY4WO10stmFBTG84XOioYnZBB1o/
                        yTRjNTjOa+O8x0hs5Bs4h1sw+zy+fiFQw5LHqCfNyqRFgigcvLLEGhiGGXjXBgBPBEzYEtxOaghP
                        i/F58258vrwbD33OLKReeAp7xBrjmbeAZyHDmTVr0IIzhEd9Blr38ynhTLPX32VXvoxzDQfnXk9L
                        S7u94FU+b64JLAjM9GHAiomPMi2rWBDAWeDVOQ+pznBwOnDwtg/IbU/ZL7LLoCmkfUhIS0ub7Wgx
                        LHjqh95A9RphAysrFYFZE8CZOpwrmWbPvgOEKaAxpCnEcRYtFA4x3qtXARBVElh9QCuZCpvweWfn
                        tmYWXMLbYc85fQ5pIGELZdvKjJ/GQ6s0rGdMzXgYC844oBnBGWaquaLkIYAzL3M2t6yRe83Wsusr
                        3faS/vrj+OeP4x/jx7+NX9NAyL9+b67JtLTrgq4DOOTNzjdcXNGFs0oLn2QXSdRo4mMAaQxoVlkH
                        wpxVCrmA3/+OHppY1thJljSmpR0CaZbYxoogIYIUzhzVOq21kuJDAdCwxPELHZ8B2ixA4360jfgZ
                        Pk8swqoYsDIsVt8cAuazc+4jQLN65HLm1LznHD/rnigQ+Dt63syZqclljV5Q0hPz4MwZVpQ80GtH
                        a83qFz0WzvTe+z7eU+9lV8KMgkC6jvHvSktLuzyANTM/tvaCvWfNvT9nFldyQdERQTD6AHD0YTyw
                        5ONB9puoF7Jf5libOcNSE31oamRTS05SnTEt7XAww0g9Zs5YUTHKFGFplqVAVxLPsB4MQwWgWYIE
                        XObIfWjfZF/ZMepFU/Oy/4vCxwxnVs8c98g9O3A8FK6heZwC1CrGBezZjTysvUDke9kpBP9hBLSP
                        4zNnTvZMjAAGPxdre84G45nIz1uGM0/8Zjhwr9iM98t23X4af/cwrldcy1fxTL7jdZuWFq3xaLxV
                        SUXdgzPr+fJm+qSvpeeMs1YYSdRo4s8AaQpJXoljJ37UeWE4e00AaFajdjfzYZmWlrbbcC3gwTlk
                        HP23ekxbsbNnTQHGvAfLUHgw4PvVgzNRCGqo4mjBGQOaB2cMZlYp96IAZ9ivY5VhfoP3w4IQJWhl
                        R7z3QG3m88B70FvrScSYJXdNjjEEIcVY2w/wzENA0xJ6DAi2lfDHEHiIWuMg+yX/C+P5J8bPGOR4
                        pcYe4OwrgJn+mytZanvzTg1ezYl+bpYMp107iEUzhKXiWRypqzcVAdJJX+w9A9o1wFkj+w3972Qn
                        Zf/H8UGFqokWnHmCH434c2QiCf7WiBguJFUa09KOhTNxgGcDYIL36pLuvVowq4Ey7/15D4ml7LJd
                        WHptlQx689C4/2xdAWeLApzxvsdiCgqNWyjTOXC/je9dM2isbjk418yaO2Wpa0ZjAyQAsJoyVG9e
                        Xs3aEwI6kfOVwTVGENISvtIg4PsRyH6WXfbsSepL6RvjueqVAosBVnw+I8hrnXulpnexZn8YYP0u
                        AMy+yL5oSlcBrudwSk8CaE4gRCRLhtMuB2OlypNofFXNGKua2YscxGXhsM29AtriShYCghCWeCic
                        /Xl8/WX8PMJZFFWPmuob2ZcobughWhoOeqpNOS3trQGaJ6nfGAEbLqWqgTI58B6NFBwVehbwfjW7
                        jiWPeDzLfl8MwtlmBpx5QMb7n/4N2G+mmbNP4x766wgBn0Zn9zu8L6scbXCgzBN1sRQp8Xw2AVB4
                        6pQeCLCATM3as66vB+eHrBvv77NK7hHSdD09Aai9h/VfGxSMHKe5oOuBXqkUqRaSo+u0Hs9RP67P
                        0rgBzgq+hlN6Sjg7e8lwWlqw/hsnwFNSDa45uoJPjXs8zzFdGcFNtbsEtGvKnGFzNMLZNmv2p/Hg
                        Ovyl+JmypoLuS1H2aNh1glla2vHOCDr+vLlyBhv7XNrCvRs5zofuUwxqmNlTWHmiBwofa7HVKTfi
                        C4JEIOYFpTjzoGp32331N9n182p5ow7R9oRBLLl0hM1I8MRS7YuAzJtd2dDDm8Uneue6N2LPyBsK
                        n68BiqYARdbfapWiWg4PwhrK6s+BRa/Mt3Q/6uscKMHvH2bc/yVQ8YIRpRl/h8BY6Sj5GHP2nJOU
                        DCekpZ0QymrmBFugFT2brM97LUi8v1v90toqgLYtcexr/+5buGcuDWdRc/TWcdDSjt/LTspeyzys
                        GTBtxYNRCoAV1dKWnMC0tLS6e14KDjHvDVYQpnT/nur9eqCm7w8dSIaGteyXbq4dsCj9/ZYwilfi
                        iQ84LG3UTIz2NymcaebMg7OSMIrXV7cuwJMFZZ3zN6Pjb5W69LLfs9jQ/zMdXbFL+kolmXMde/xb
                        9VmHGTExnPMI+g4BoLn/ZxBbMOeY+6zmPdVCSuh4ohNmAFl0fSLn1AqGzBkUHgWoakqGc4B82qnA
                        rLT/RgcLUnHJvSVY5b2ySBGO0FClVp1v2FUGmdy2BexPvtZ7Z3HhhYERYqy7fwfOw08jpKEgCNfg
                        1yi1SSGyVdvsm1CWlnY6SIui3nOy3q/1ni1IE5n2eS0MR8ttapZ4zlkTgFhUIWDNOXuSqQLtR4hE
                        KlBtKuFM4YvFUL7Bz3smQLP+xkiV0prNJfQerN9hnSvP4R8qAGCYsZa9/gqrtFH7q/VZJuCIo4rp
                        Azzj2gCi5gQY5q75Uwcnh8LHuHZfpKx0al6nApCVZgjWOKitlLP5JSgTqSsZXnmBnQS0tAPBzCqf
                        Ry0HfsVj6fzbG3EVfcxwhlkzBbNfZTp8Hu9r3P9r9h7MQP/rd17b/XMNmTNcGCyjr6U3Gu1FOXse
                        plkLU8f0n6SlpZ0X0OYcl37vFqhZ6nU1r0PF+SmpXDUGNKrTpw9cDIC9l+m8s7Xj7A4UzbTk+VHW
                        HFUqeY4aDxTn0tVIhEkBGPvo8PeooIw1XsCCzBIw1wBaBNFdAdBQAOsB/r4V/H0qo6/nvnWcjHOt
                        7zkzAg+BsyH4mNUasaTJW7NeILZ0jbwsQHR4Gf25mTOvZNjqXbVKhyUBLe0IMFsYzwc8eL4hH4vg
                        cxGQWWOtRKYjNL7LTsTq0fH5W5mqPZcyZxyUG/T+2dq13EPXVNaIw5+t4dNPsFAs2ejSAyNBKy3t
                        uqBMpJx1uCYgq4U0dD5bqe93mnOuRMrVAVbfDu+zK/HLDz1neU0A8R0c52iG2oYenJEi5dJ4uAvA
                        C44G+Dr+ng0813hYsgCscuZhYxy92L1yEZx5g8Jb51ml/wczaI1MZ3tpyeNapj1n3jo6NZiVBEXm
                        3pOeAqg30wjPhY6A0LXmjX/wMu4MYgtnzdUcHqAdAmdRyTBnplkBtoH1kYCWFgGZ0N7b0fMAg3b6
                        ir53Dah52bNIxIrvHaz20Pte90feRzvYCzayXwoe3Wt46O+9mjLhS8JZYyySB3AangDMGMpSNTEt
                        7X4gDXu3rOj2HFGDawI1C9a8+WG1P3eOlDcLO7RGIMwSJSnJ6GPZHQ/j5qZtzHD0lXDGD/pOpmV/
                        mkn5DMd3eMguyaFYECRvnGNtfG4Qfyg3qg034vdkePL16GAsZFeuL7Lrt0AJee5Nqx1XcAoo8wIm
                        c569XoDCKylFONte308yFbD5TnDG0NsU4B8dTet4hI+X9H8Y7NqZPknNfYUiCF/osPowJQHtTUNX
                        TeDQSog8AYx9HA9tIdK5wu+c+6EEZVYAw+uh5l5phTOtLOBeM+zd1WcMjwARJzBnCXXp98g13EOL
                        Cy8oT5nKSqtGkrlpaWm3Y5ZynzWP8JYDMDU9rMMJfl7tebGc1aVMsw5zhk9zXxRH+fXjqKyxNMuN
                        pdIHgJbP5DB8l13ZH0aAn+DBLrJfQsZwtj4RnHE/hVWOiECCisUKZJoh1I87cmDm9sbNWWet7Gec
                        IvGZQ+59LiHdOJ/T88DKopyRRafTGsXB4FV7eA5ppLh5DJy9QMBDwezTeGCwQYzz2Mj5ZvalXReM
                        zfnYyiJzG9EWyH6BQzUfNJP2RPeCB2PR3OGof1poTa8AzBbG36UBra8BnOF+idL8KGT1HDyn3hac
                        GQ6ZlV7FjBlL5ieYpaXdJowNjpPbSp06461aTVbtUPCq/b+cnSw59zWAtjYgLVJsHJz934Iazpoh
                        sDzSc+Hb+Dva8dmh/coKaAvjQV2bOZtT1uhlziznw/pdeE5kfE8N/G0Md9XqhQc8lz31NmtwbO0+
                        wGDplZNacMaOlHXOsJx4STD2ZBzcNmGVcTGcWU7oIT1nuLY2BpxpeTAGIhYyFU3gdZtgdr9AVqM8
                        XlIr58H3GsT6eQSy38OhgPaRAmFc1eDBWKRq6gl84f64hj2+pT2qG9/PB9mVNa6N5wv+zI0T+OCM
                        3L9+zqWzZ9cCZwtjI7UGTSaUpaXdB6RZWRSRabT7rQRjmlf8+da8Ng8QhwJks4iBN9fNGrItYmdn
                        rH4EhKrV+FDtyNFfyK4v653sSnNwLqaXbdgQbO7Jlcs8QRDMmFlwZsEtZu0QMFqxs5rnzJzxXDiE
                        eYxMnzJg44mzeOMmrOBuD+fb619HYTGvr/0J/JBlhUN6aJaf/3bu5Xw/Oo9Y0qXfh9lqzM7+q7T3
                        NR3LQmld0bIEs3huI2GoCHa8fm7Omn0cQUznCv9xfP2dsYc+OIEJL7teI2LVGMHKXqYqjkL3/nJ8
                        Tz/JtLzZgzOU5v8mu2z0siLo9abgzJIV5swZRqs4YpeWlnZ7QGb1lwzkqEfNwmnH77uD8zAsXcMI
                        shk21gXQ8aAmKnvByCeqGupDGUUzcE6mluU8EuhFZXUbsUUqSnBmgaaV+R0cqH2R/ZltYlyrga7l
                        OeDMy2geI34hBthbjho26OP54rJCDOZuwJ/RqLqC2AfjeG+A2ZP4ZYyRQ3ronDM+F1hytaQABM4q
                        fJTpjLz2iOtxKHSd6/cMCXEmmFn7Sle5d7LQFuo7vAc4+z3Amc4V/hnuFcsfrwWxWhErhCkPzPD+
                        1hJnLm9m5WIN7H0HMHuU/XJ33P/3ZiXeNZw5/Wad2I253HOQvWZpabcJZlxKxv02+OB4a5mzSwTG
                        LGir/T+cecNrvJRYkr4ENo1zzdVBb8ef9yLT8rMNQASLSmlpoxUltaSVa8Es+jusfgoecWDBGQIn
                        S0Nbow1OJQZiwVnrwBn+fXNhRGTesGX9GoIK9oy8gCOnPYcPMh20rtH/jwacRVAWlS9aa7XG6bRK
                        hbGksYXPWT1t7al9IQfCPNCsVcc+9HnhBoTeEsQ5cvdeP25NSSFn9RnOfpZd5kzB7BcKbln+uCfY
                        daiIlV7bzgkeNrDHf5Bp72nvrFWcm4bqj8o/vA8j6G0utQauqaxxYUTErMWQlpZ2G2DGjqQlwoCZ
                        M69XJ1VZLwNtNf/HArWFzM88WQ92bujWn8/ZE/24EVuRD6sxrCyWBTtzoKckPd84QQsL0NhB6J33
                        E6lqHrsGLHGeU8z0kiBY482aw7lfS4BzzNDK+DUta1SBg5/p+GiAmQdl0aDpUlZgDpxhhqAH4GWB
                        EJ5vxgO4Z117Zzi3FF6bM+/F0fr21vjexzpU+FahjcCsC/YyTznUE+LoDDhDMZCfAcq06kDVGjFr
                        1hbWQg2A1awdfJ6odQRnvFd6+w2O5FAwQ4Ep7GlF2Gsu1Xt2ybJGLzLgKSFl5Dwt7fbBbC37pVv8
                        ILIixmnXDXJRL1tNVq6p+Pki+8qOCPODxNFiHkptrdWa91zzbJPAebGEIB7o3vDgzIOxU885O1St
                        sQlgxIJhq6yUv6ZwxoIYPQDNdwB3dTbV0fwFHM1IeW5xAJDVQpm3P3KpsQIZ9sZ8pkNnCEaD42uc
                        /1I/U+1xaIDHExyKjhLEeffzHrRdI6w5YPYguwzv+2ANRz2RnfEz9ecqoKGM/kcAMy6hrb32zRH7
                        D/oFvC8pnK3ErsSJ5iVqgM6an/joAOjbKGs0yDiSUu7keOnetLS0y4CZp+rnSWBHvWZ5398WqNWC
                        w5xsg6ck6Cl6DsaDvXNgf87cuTnnJCrd0fIdvUcWYpf+RiMO5ITvm2HZGgo/xzmrccQZxjiDiUIZ
                        2COCMNeNMCOyi6hrD432zaAk+KMDZSUAbWZc3xrnk88PZsrUafztx/HPH8c/xuPX8XNfDED793n1
                        wMPoY+J7yCpZa8Uv1z12f/ZEbry14Dnfc+FuuGJYw71KAeoDgRMq0XrreSH2XLGFAWhYAs7wVxLl
                        a850DgaxBVA0iRNl3K3su0AgrHZc18Xs0mWNInZ9eyf+ENq0tLTbAjNPxW8QW+XOuv8T0G4T1Gqv
                        WwQx1rPCa34XieXlS0G+4cznwrpXcP1HvW/Rezz1+56TMZkLZzLDmcY9hGXkFUoUzprR0dKsGcIZ
                        yoFHUFYDZMc6pYMBaOhEbqFrmx37NMKYBWefxu/RMiwucYzADKuVvKC4BaueEIrIcQPJRfbHK1hO
                        ttcfan2P93/ctbYtX7skqI3Xx8qYcSaY1/ST2CWOnQPeeM1ZWMdSS68pZTz38wTnL7YQ1OLSaK7K
                        4WqdaKTLVfHGNag1ltLqNRvbqR6YaZdz6NPu41paThX2TXDzrkbjMmv2dmBt7s/w5uJZYCZil83V
                        vr9aBctT/c0cIY4i/q+1d0b9SKe6J0vlpLyXrAAENjKdoadQ1oyOqvbO6KEljVaE3BPXaM6wlr01
                        bWUJFdA+A6D9cwQzHsZdHJxb6GNC53wpU0U+7ziVM+upvnIvopcRsQRkotcS9L06qEH/HwvkaRmj
                        ghkrKeq6tjJcXo8o95Au4Pex2Mg1CHPh7+I5nXpdBUAMJfNfKBjM8wM188xlwdZ+92bgrNZZj6Jp
                        zYE/Ox29hLK01wGztUyb2bkEh0tkSj0tQ8Lam4c9qywLP8fOXjT4/NxgWfPzB9nvbThnP9mxoHaK
                        c1Qadm457gxm78EBG8ZXhbOPsq/OiEOca9SfL7XHIKRpeaMOy/1sgJklHmM5/lZWRgUh8GCZfm9A
                        /LHCMB6cecPgN1JW+bQ+Xhe+zwO3PVA7B6RRmSlCM4LZLyOY/fnH8ScANIazRQVAez25VuXataik
                        N8Y+2QOgiezPMfsG9wiCGvZy/uYEOXojWPRm4Mxr6PQiJxuIkHVyWL3rtWy+6cQnqN0znOk9jBmz
                        Z3IkUDBCCpv/Na6N5hXvjTQbzq1SFC9Q4PWdNFe0lg6ZP3era76pXPsD7RU9QAX2yWxgDeB4BW9m
                        qjUG4FJOZ1QyOhhBLnY2OWvWEJSJ2DOungBcWQDCysRYr8eo6Q7Oc2PtAJo1mJxnKuKxMj5eGV9b
                        Gz/HEqc5OaQ5Zaa6vj8QmP1pPP6D4MyTuS/NHrMGWXuv11DmFwWzGMw+yb54zjPcQ5iV1hJhDHYU
                        S4TvGc745uQbjuVjcfDoXDjzyjIS0i4LZdcQFU4rX4Oh0sGyZva80Ma4kv1yxkgmvHce/K+1Zpor
                        OP9pcZmf5dBaPSnDlZ/nQ+bP3dM94M00QuEUrxzvAZw2S3nRE/u4hue/N/SbIZL9pN65Dzz4QyEF
                        7GP6WXaKlj/LvkLfUvbV/04x6sSDMy9zxn+7BWUMZDw/0Hrlz3mKqT1C2jGAZqhldhVg9meZZs5U
                        gVRl7qP5Y9FYBC84Wtt3eYn7xWIHzYppRuzX8fgkO/GcZ5nOSNSMtMLc94SznWG0BGtCdeaApvS1
                        +W9pwJm3yddIxCagvb7zaTnh6aBeNzgPwT1mwRnfywpnqpjUym5m0YIezC1swJ1cZsZZU/h7hzOd
                        97wP4nMVDYgeCmDG/6854hq9Jsy8tWdTJCrTGpCmMIbKr56qYiPXOTMR/y79mzjzt5T9flzswRkc
                        xxt7jfTn6uBhFU3BwcOoAuiVNrZy3rLGnsAoKmm0jpUBZy8yzZ48OwfPlFtZoFYLaMaAb+u6YDbz
                        fQBmf5Zd1uxnuk5WRrhGZbT0rLvmPYh7NTVztgWtbX/m38dXFM9BGFf/5KvsyiDVT7l4QG9x4ZPK
                        MwiwHvTTuPAUzJ7BoWsrIlHeIM0cbHs5579W6jbt8lBWq3jHvT5W1gzLBfSBNMhUCITV9rSe/BIO
                        1amls+fC8ClArbnDddqLH9H2BAVYip5/bnNiSI76IvM5c/x96fXNNMH+dY33R2P8TQsCM+wF0zJO
                        ne/U015q7ct4fjBr9nF07lVgQg8WT+FSuVP7UUMB0DZiqzBaLS8bscsYuQILQQyTAN+dA4EN956N
                        BWhGOal1raMyU4TmP8p+xkzB7KNMe82s8u5SlVhNkuNWgnYbA9C2mbN/jID2BeCL18ezcZ3/PZri
                        UiMWFldyUnG2h4KZTvHux5vkSaazFmo2b0uJZiF+r0La6wG5NdMks2jXdX16mc7PwXvMitTx/YwP
                        QpTOX0L0sCPnSn/GpeT0mzMD2pwsci2s3TsIIJxtJI5ua9nsOoC0gcBsKFybY9aPyHEjBtL857xV
                        0hrNibvW/lXOnCmYvZfpfCt1LjV4pQEvCaAM1f8exp+rAIC9TAhn2MfUBTB87jln3qyzSJuAIc3K
                        nj2DE69wpsdX4/gGoIZ/5zaD1gfAHQ36tnrMGMz+BMcfZCeh/wFAfSHz1Y3vcd+xShxxViCPnvCA
                        fm34PBexV4ezLYWOjZVcBqU1oJ9kN2xSM2aotBSl0SOpWGwMvqphc2/Y8bcabxPOLuP4WpFJdHh7
                        ACqekYNwxWWN+lDcwP8XcC7wodITnJ2qdOYYMDsXnM0dmmq9nnMW07WtT6GHL2ZlEdZ0L+Fh5+is
                        t+KXREawPGf9NIV/J6jNe26U5lTx86QPoPyawAz9FsycKZhtnXGM+uvQ7UcDzhjIOgf6tGwOs2Z/
                        GD+ns7PQT/IEJI7ZG6MgVWmodO+AWl+ANFTs48yZJgZUKMI6SsF8D5C9a8NlpjrD7I8AzH80wAz9
                        4YVcb7nuawZpWiNQs5Z9hcbvznNhY/ijwyUHk19T5kxrP3+TXar+Zbwp3ok9DI+NwUzVnDQK9U52
                        ik/RxPO08z5grY20N+AsIe11rxGKeeDDbEVwtpCpAtpCpopqXFKigNeQk60P0NZ4OFszzy4JZ6d8
                        6NVmkUvQVmrkvtc1upL9iLfCmp7Dpexn1nTNNeL3qg2OMz/MWDueClrNMOcEtfqgkelQSdybeM1O
                        ZksQ9VGmvTAaWHgaP7cygmbWTLKFAWdbR1/7zRTMvD6mGrGIY+DMAjQJAlQWxHlBX8yQcCbN0jfQ
                        yq1PshOWwHMhxh6M58QqAe0cWLaGTHOp6e9lKtby5IDzW903OCHDYkCN7LdboDhZ7+0XlwSza4Mz
                        VVppIfL5Vfbnk0SqRFxbrRGJn4xNrKGFnTOUzvNwFfFLEqyodvaeXcbp5XsR6+5RzANr5FG2ekEb
                        oV5LdlSt/jJcE5YK5Gv3iJ6zKbomi9yLHSHG7DIGpErqXPcKZ1hypIeex4Xsy46vxvUnFCgYpDDr
                        6MBILvfnlKSqE9TsLAoCmVXSunGeHbf0LLHmXH2A9atgtt1rVVluTX6NN5MMq4jeyVQNUI+fAue/
                        Zj98jZl3JYirKX9cG8FDFIb4CmD2XqYVWyL7w4qt8+8Nc17Q1xDCfwY40+N3sstm8rW5NtXRSwY0
                        OADxBIcGkFuZtl54SYGrSQwsrmAj1octLrQNwNqDlLNmGLXQC6QbkM5Hw/revsIZSzv+5omEJEQy
                        a3ltAI0lid/H+w9LAXTPeJJpD1lHr7ph4tdZAMSqlfcgxnqAN690Xs4FZqUs8iYAt96IGloDR+9x
                        vVpljQhnuoY72WUY9GsaQMDsmdW7woA2xzgI4cmje308pT2xeQP7kSWtvpJ9oQYUGhrg/Huy+df6
                        nNT3rQq1mFHBqoPlCAzaO4N7sFVujq9LmQ6e1h6nj4bzvxS/qui11EiHGf/2SpKtAFcEaZql/CjT
                        vjsu2e/hWvXkey5l2k6D/17Qv5/gWuhIg9/LfraM1TNbJ4h5iJrwqRSILzUnEOFMwew9nLf3st+f
                        J1KhdzAKvrw5OMMG7wYASj+3AudwIXavWeNcJI0OfZOdNLdesA1tZp342bi0015vvBm8EqAUBrnc
                        tcH7Ueu1nyGaqI3oD7IrO3yQ6dwyjjBujEhjVOrhObE1Tus54Ww44c+rySJbw1bxFYfzRrOH7smZ
                        58yZV6ak56wDR1SdTt1jOMvrnf+94b7iD0nnLLFVWuat8yi7VrqOzZ1cW3asN2KP5UCRBoWzXvYr
                        Z5YVAaBrBDV0NDe0v6rS4neC0oYCX97QaAQ0bPnQ6iRLYOJSkuoMDU3Fvhqtp2jf1b3kvezE5x4o
                        mINl/trnt4J9mM+tNQh9Ca+P8L2aSPgJoAyB2aocqz0fQ2HPqM1cWv8fX4cLrA8uB1bfHyvm9Dx+
                        Hs/ld7Grd67O17yGzFlvREbVMcSZGqXSD6zXfi+7voP3sisLELHrUxPOXhfO9AHCjmhK6l/uuuCD
                        SO83nB/yTN+7hgcT9qDxcGl2cD0pbM9RbS8IZqcKEtRmkb1rg0CCkVt0RnmsQfPG1jEqOWqwD52h
                        hezK5Rdil7hwmbU37LoxnD9+FrUFR7kEbF5g4t5graaMUcEM+4K+AYwLQc2tiX9x9mxBvpH6Ntov
                        xrOYrDVnZW4XBqRx77ClwnsN56a0rzYVAbFScEzXjmYOBfYUzNhq0B9L/Xn0AY8/YEDTA7Nnms3E
                        jI+1hks+Uk2vZeM8m7yeP28ffO25wZYoFiZmUEwHAe2zTCvxVjXv85LZs1eHs1GpESONrNKHZSmW
                        ZKt18TGt/DT+nOV4gV7A8beUHDt52w2Vr/nw7WW/nOuYHo+001wfFOYYKDCCX8f5YyLTMmJ9EC0K
                        kTlPYclTtrokmJWk7U8RqIjkl/H6cKZHjR00a27cPa3VFpymBf29uFaFHFKt0HiCtV2aizZIrAgm
                        YsvzR4Bm9QNFsFYjKiJym/1qpTJGdIpR6lxLVfE6d+CYqfgXy8Hfwv2AJeFPsl8RhOI2Pf0/K9hl
                        Bb+sHij+/lvxh5oZ4DbQPsLByYURmNQKro/j6zN8P/YB4ugDXIPY+8SljjzT7kmmWUwePM5+c2N8
                        zoJP7xlcgjquZLKCq7xHXeL5bAGaBbx6br8ZAZvMnFVEzVqITNRGChHONPKE0SXcvLgpM+Hsda+x
                        t3kkmL3+NUHHaAVOwbPsN4Xz/2PpZ324YNSxFLGbc5zz/oxKYs4NZ5xFXhgBqgGcBYRjrrln9cx7
                        qgjAcjd0oNSBx2AC9ulgI/gK1mjrBI0iZ0TIAbHUAYWuTSRvvig4y16f2iEKkNf0fPOyGCz6wWCG
                        2QsGM+zTUgf5UeIhvdcKGa1MK3ow8LwurLdGfPGZEsDdWzl0DbgNBpTiXsHz5p7H73kaX1G85SOt
                        P4YzLLfFVwvcopLcIYAVvJcOqQLwAua8p1lBpeFEz+uhsGfga28EKBcEaZjBfHACNi6gXSp7triS
                        jboxoo+byouMG5j+TTybqRFbTWeRcHZRQBsSzK7imvTgsG6MBwo6vnwvcQ8DBzxKD80mgDbve18L
                        zs4BZhYQWLNWsN+G58Dpz0Aoe5D9vpF7K9fuwXHSZ5eW3W7X31dYwytyLvRz78hh98SlrP4xdmDx
                        ZzeGE2RdZwvWvEwa9nFGgiKRAmTJSb30voPOJGfLvhtQtoLzjUFWdKTfG8GiW+o742uo6yAaqm2t
                        25phyK8ZBLtmWOM91erR+wB7jwbKcIA0iqtgLx+W2Fr3t+eTNpX3kho+N7AfF5MU4uwRnkAVtyXw
                        ucEs4LG9ikMFkHkjFXiANPZgIvBaZc6ZOTvgotRcXFwIm0L0MxIfSDh7vYeyd6OlXc5J0sjXWqZl
                        GEuKjLFzyQpUDzOdIU+S+VRSzacEtHMFKXqxZfVXsj+rpQcQwHP/SNHBTi7b0H+u6+LB2dfxb9d1
                        yuVfvQNoC4kzCl6ZoQUYm4pgkwVra7qfasRyoh7Na+xXqxH98LJlKiePGVGeFYVw5gWXrl0dmMvV
                        MOvbVaytaBZZNMPx1veIY8/14NwjPJrpw3gtHmXXOvOOwOyjTBUCH+kZagVZSmq7Q8W9hfvbixHQ
                        WItddt0Y9yP336IS6oKA9Qn+Ri8QcorB5FHJJY8BQuGWwQl6XH1lyeIK31OU0vTqZFtnw4qms99q
                        jfWtOldNBYgnoF3m+qDD/yL7UsBW2QJH661S4bn306X7ZobKYNE5AM0CNZT+xaimgMOG1+oRnFKr
                        bONeAglYOqt9ISh93ZKjIeLPIMNocEmoozSjz5tRZ4nj8OcamfZ+WoNsvY+9r5dA7bVgba7oB4IZ
                        O1pcTq1Qhq+4d1kZz2uHBg/WaoJFzcyP3xqURWvUKm1uCc6w7eZBpn1NHyk4YJUoevektVd7wevG
                        ed96L6FwzleZqpqK8R54pAiKT7Fi6BL+PitLvTjSpy4FML15dgimlqLrWg4bjZJwdgS4lZTQTvGQ
                        SjvPwyeh7DruKb2HrP4Xdkq5Xj8avNuceJ28VgDh3OtyqAC1jUx7INYyjYBuZL8EB0FtcadwNshU
                        vGY1PoRZMl9kmmlURTUUtsGGfAxEWJBm9eVEmc9owHjvwBq+XysA4kFbJNnfGoDymrAWiX7gEGCG
                        MgSzgZxDT0ThSXzlwVu7DzijM2c/aq5kX72lgI9VXj7A3qFCc4/gO+NMLewzs7Jl0ViYkkAH+7mN
                        E2BFONuqE/42viqgbRw4EwKcleyrA+v9h3L1ltjGsa1CQ+Xe6iluPgd//4vYok8JZ6/g8EdQlmB2
                        PTBWA9hpr3uNIuGCkkNqlREfWjLQ3NjaPQYCB+dhPMi0pGkj09p+FLuwpLJZeeyeHCpWbMR5Teic
                        twS6ulZbmUpfYwkSluZEYGbdC0PgNHi9HF62De8nL/PHA8gXxjooyfSXnovHwFqN6IeXLUNHCh1k
                        LmF8J9NS3gfx+0pu8RnfzHxOpg9zHJhhOR/CmZYvokLjg9jZo0exBT1K91VJ4XgoABzCmSpMbuHk
                        1xFQvlNgqquAMywNZzhTMPsmUwEeT2zjEDCLwLl3Aj7Pzt+PgHYTWbTFnd10noyxF/lMu19HOK1u
                        M2xmBDXwgbaRujEITa696t/LGclBbCU/Vaprg+PaZzsdA2f67OKGfew1UucIM1FYlqODSj+Qg7+Q
                        Oil7diIGB9Y2Ykv282E14XP5Tm1QZc48Nf4bj4U1T02tJJGPYMYOIfaWvTPA7NEA0nsNvuZz8rRg
                        xmW2GwdImnGdYRb+yQgQLMWuNqkdeTGIX9o6FOAM+650YPsWUj6NH69kXywD9zIMnCCg6XnC/ZNF
                        e94TmB7jZ9eAmdVzhnD6VfazZzi8/epHN90TnHkKW1FaOTe8tLcOxENwD3FPppUV4EhWOhKncaz4
                        GnC5nUidKlt7p+t1cAANsygvMhVOQXllLMt5J/viEZ2U1Q9rVMS8Ekc+1gVo8+T+BUC9kbjUsdRL
                        dwpYK5Uxcrbsq0zLGNfkQOI1s8DME3bJipi0GjDz7sOB4GxJ/+YeX0sQwyrtayr2OA7QeffZUIC0
                        Fdxzz7AfWve6FUBZyX6/58o4XwpEp5or6A0K96p1WPFV9xftufsq0zLpzJxdCM5Ks2VuQbUpLe1S
                        gY2SLPfgOJE5EuF08GEFmlDNDx1YqxqgcV7vwbni88LghQ7Tg+xKQnnkA/aKcLYtKkWqcfwsSIvK
                        HdkxXBegzYsei0wFRVqJ+9FqBEXmwBo7VygwwL1lX+HjZ7FFPx4MKIvKx269jDHtcmDGAhi4DjuZ
                        jjTw5pJ5AnPNkc8Cbx+MfnZNQMUK4qF6M45u6en5rxCk71NLCueMAqiBs8EITonhY1hzEhHGuCrh
                        6n2Ve+45KzVFyxE3TlravYOaN5yUI3TR7J0h76+DH8rRfob79lsKODUOoFnZsydw+DnSjeVIqKxW
                        U4pUEo2xotk1ZY9eFm1deLXuPxQW2chp1R+tUs/WgDMGM86WaTQbleS8bNl7mc6NenQc4oSytDlg
                        1hv3G87GxdI/VAldiq/EeMrggNeH5lW8cMAK90H19zEjiH+flXXjOWk86LmFc6ml9hs5fsamt1da
                        fzMa9+J6vv+s93WJAdT3BGcMaBzp6w6IhKalvVUYsOYooVKjJwiSGbPz7WdY3riWqdRzTfbsHs+P
                        5YwgoGmZHEe6vch3V3CumsL94zlUkSqnp+roZdTWDqhZc9ZE9rN2Xl+pdc/PleoX+J3YoP9MUKaQ
                        xmWMnC1jsQWWJ89sWdocMLN6mazqDw/MFrKv6PpaiqBeX5oVqNKeWg166LDsldhiUq1x3yKYrQhc
                        hfZeBtRT/r2t7Ad5rcoeva4sCMX7kJZ3egrUV2OvDmdbCv3rX/52zgd26UhLS4vvHa8kuCk4l/y1
                        vN8Odyasa4PKfGqlftp7h1artFEdeXUwSjPMSoA7x3GKvj6n9NESElk7sGZF/72gyaGS/a2UlR+F
                        HCItffpOYIaN+TjCg/sBPRW8hWS2LG3enhoFRHiumaWIainhXio4wAFVfI8qnLOGe+tJdkI7A8EV
                        i4L0FATyygJFyqOqTgXVYoCoV9WzGeFL+4h1HiaP78C/a4h45c3AWVpa2tU7vLzhozNmNfxf/cyQ
                        GwMzT/USI7oDwdlbDD5ZpY1Yqvgi014Rr4LCOnfNCe+rGlhrJR66aqk6WpC2KUAaAxv3rM2FtWhe
                        kiWVzwNxFwBm72XaC8hDpV8zU5F2HYGpQwMiNZDGgUQu0bUUUD3tguYCe5/INNO3lP35bI+y39PZ
                        OEA1GPtLVEZtPZ9OeS4iMOuCwJAGhSxA45JNDFRNfuclwewe4axU458OZFpaHaBZKm+tTBtyh4Lj
                        lzb/IRSdTy5hEfHVaO/daY36zjR79mwEHcR5JnC29xyZ31oJ+gjWItXHtfhKj9ZsoOg81MCaF7m2
                        lBlRjRHnzVnDfBnMvLlRCWb3B2JD5X10qvvTUlWsGcd0LcGBBvYK7ClrZVfiiH1jAl9nwBwMQNtU
                        BH1OAc5z93trVpsQnL0HOBskFgu5OvXGxR3e7LUSnMMZH8Jpaffg8FoRww3dZyU5/bR6KBPxBVcG
                        x1k+qtn5DtarVdqI8696cEb4+WApePVi9yGcu4/EAzWRsvKjl1nzSiS9Z2MEbAxr1lrT34vy3dZQ
                        6U6m/TE61JZ7zBLM7hvIhsqvMTgNJwC0JgCzKENzTWuQ+7Dw83h/remetsqZReqHP/fGc+mUY3QG
                        57qX5rDq+9as/dO4dzQEbd9lKka0sf6WbftVljWe7qYvDRXcJKClpVU9sCxA4/KlXuKes7S6YJKI
                        r+RnARo+kGrmON7jOrWCCSwK8h0cE314Yz8U9lY0MwHgNbJqNeWP0Tw1D8I2DtBFmTYL1PC5i2CG
                        WTP9t/4fLS3lQb6oxoizy46V5U67TiDzXkXivlsrkNEccK81TkDL62mqHSh9ySCVtR9ujHu2NKew
                        1J9nZc6GM/99/Hd6AUntmXuWqTCIghnOPtMy606uMHt2b5kza3YFPoQzwp+WFpsHZugkWffaxomm
                        pVM1H8qssrVe/BloDGhvLaDAMteP4ORrKR0+uHFA64NMxW7awBHj6P1rghr/3iirFmXYSsqQJViz
                        nDSeL6RRae4v0zWKvYGW4IcXzffORe4x1w1l3poVx8GPMic8k6uZeV9xtmygf9fM+myubP/D84Dv
                        exA/u2XNwiw9my7ZxlAztw2Dmghma9kNpf40Hu9gz3lx4P+i2bNXh7MzKTXyA4rlQFEW1Mqe5eae
                        9tYtUmtcGHDmOXWZla5zVmqcaHaQLUUxK8PwFksbMVqMcvlLmZZBsWrXCzhnKBrSVjoEc+DqlLAW
                        ZdXkAGDbzIA1PRoCX2643xCYLQnKOFNmBX+E/j50PJuEtJvY57yPPYEaD8xa+p7a/lAu/xtonUXP
                        QZHrL6VtggBOa1ybmpEgNddP5HWTHE3F9dB9CMFsGyzCsmkrGMTPzosnb+4tc9Y7cIbNf1fbAJiW
                        dmWAFmVlOGq+CQIfb9l5isQ+asvQ8Fy24GRY8PwWAM0rgWLZawU17pPE58KzTOf88HnkcqEI0poL
                        gZoHa9rfVRqEbfU4RrCGMtsN7AOWM72EIII1WPoRHCR0rnhsB5aZsdMpuc9cPZTViLSVQOnYgF9T
                        gBHL8b+l/kbOopVAo5m5v5a+dgkQFSeAM8i0D/kBAkGP8Gwolk1fKnu2uJNNgVW4MIKnzciRQss9
                        berDkQs+7W1CGUcsPbWqxgEzVopDdceaCOe9rUHPWSnNs7J6ffi6RKMO7hnMhgByefYOzyXCzBKX
                        N3ZwbbyG87YC1Cyn7txrfA6sRc6yJ9/PrwhmWA6K4KbZsiX4GQ8AZ5o9w6wZ/hwxghe4Fw3kiDUJ
                        aVdzX4qUS21LWTMs0eM99JD+ssFZI9E92pz5vn0NeDn0/ZfuoeEK/87BgXov0GzNt7yqgdT3JAgy
                        yP4QPWxMRtWoFTlCt+DQDEd+veb/vpZDkXa9mzqDGcrpW/OMLHEFLHtqHAeKX4c7WXclBcYa1Tyr
                        3MabO9WJP3/nnsHMk5NHVUFUcexlf+gqruHGgLOSOEAbgFp7AVA7F6zhGrXAjNeu9pXpx9gH+Cj7
                        oh9cLs3XV68b/vxOphm16G+d62DmM+/wAFRUsm0FUywww0DKqeTya4C9yXVQ9bdfsvSvKdzHVstF
                        SRDwKu0eyxr1IqwMOGNAw7TmJaNtw4yvnSPN3BQiR7lZvZ0NuSSn38p+JJ3Lh1cyjU56mYWoPGy4
                        sXVXgjIrG2GJLVjXpBVb3rmjz11z4/qpoCwqX+dBq9rnpP9PMzhLAy42AGxeOaOVRbMgzvr/lwC1
                        U8Eanm9LuprBDPv8sLTokc5/5zhbXM7IzlQX7F21TuRwovP41sGMM1+9sy68rJkUgnY1A+PnXL+h
                        8r5Iu617gkXKSv6/JRB4VcB2j0OoMbq3vRBblZatbKZKaOpAzHey34h8jkV3KHiVPi41as69wZqZ
                        m2FuYvcNaAxn2jy7kGlPCG6Euhni0Ecvq9BK3MNzK1m1oRIkPAVGSz3WE2dpnX9bstC3fn/yPmeN
                        GFjT2sOqCHXiH+DcoHz7AwXn8Lo1Mi3H9UoZo8HM3iyeS4LaXFhDQOLy5N7YH/Sc9wTH2Pehe4g1
                        +NabrTZ336p15ETKCna3Gix6rf2uRtyIr28pMGgFQKL9rTnB+k+77TWJYPYCvv/W7/8s/6vQ+Hn8
                        tzIADue+uizaPUrp98EF0kMVW5YUvetm3MjDARtZLWxF0FWq665V0vEcj9oZH7nZ3a9xWSM6WEuA
                        M4FgiEpoq5O2kv0yO876dJWgdo2OUg2URb07Xs+rdQ9ypqypPGf3BmVW3xMHBlYAB/p8U0DDIdUM
                        aFa/QU/rbGOAlVdu6g2wvSZQK8GaNZjb+r4WgAshbUH7RgRmG/F7LYXeh/V+UFAkyq54YhQidT2E
                        bxnUStnVmoxZ5IN4YHYLkvZpl12PqDWhfv/W1//tx/Hrj+Of4+tv4+e/SWEIdcLZeS6SPri3zqJm
                        zT6NF2YrqWmpRAk9bL2m0ZoSiZpMV82/S/MlvA2xJkUbSadb/SzsXIgcPgQy7TrNKmvEkiQd7IsR
                        daFgiA50XDpgxkIN0RBl6xgcR6l55b2mBspK86I8MLMal7tKR+XWe/U8KMNeYsyYcTntWqZ9T0tn
                        LVuZMynstd7+72U5u5mgxqXAlyi1b4JnnCUcIgBn+jdwUMdTRvOEcbx7g6GOr00paxY9L0XKfYQl
                        MHgLQjwiseJnXwgYlyp1vPPfyu2qKKadd21i5kyDxOrzb6Hs73D8On7+i+yyZ1agNOHsDBcqImid
                        daBRU+vBXNNUX5MFmyslG2121oZXmocUAZoHZuw4Lx1nmp2LBLT7AzRdD5ppUPnrlez6ztQhw3ki
                        At9jgRnPoLLUBmscJM+RPdcD+1Ao4/t0kHK2zAuKvAUo80pBOVvGUIZKgZrB4bX3INNMjgcLkcPJ
                        32cF9jxIK4Galwm9JABwdssaNo/7RSt2xqwTu4R0KAQvvMCp16tW+hsU8vnv8LLW0V4kct9l/3NK
                        GIeC79FWQtkcIEufIw33Y0zKfBl9/i2c/WMEs3+M/97C2VeZZs6uTiDkHuFsIDj7Ol4MdTCfZDp8
                        TmCDeTQARCrgK4oq1QwArR1CazmAm+CBUwNnnezPBnoIDnzYolpWAtrtQ5mQg4Jw9mF0hvvx86pw
                        9wCw9iw7xTuEJ/xZ+vN07S4D6J8LayKnzzicAsr6IILcOmAWZcv4b2tudK+2oMxT22Iws4Ydo7y6
                        ta/hYfUaR3sx78tWBmcjdaWpNbB2qbJHC5I3znNpMO5PL2NmgTAeXRCMlIJjX/u3sLqsNdy95ppc
                        izLna92fXjZ7KPgbtVmy2mHvt77npZ0/eIR+v1XWqFkzr6wxM2dn3EwwOoaZswexS1lw00aRkNLD
                        xOvxqnnAe4pt3lyZTfCQtORCN5Vwhs4C9hVpCRseCraPBGkYGUtAux9Qw2zDO9jEFMhWMp0/NMi0
                        rIzV1ZYAZezI8KDZSC2vpheBIe2Qh/m5oczrU4pmsNwTlIn4/XkMZQxm+HmGhLYAZCjf3tI6GYKA
                        Ge7BrdjVCvo80dcI1DxI6wpAcM6yx+g5xkI2gxFc6OhcL+lct45jxTPorABnjcPvrTMGM8y48vop
                        lfNHe9E9gFpNCWOpjeIYKJOEsrQDrBe7ag71Jr4UwMy0Swygvjc4w81FnUitP+WyPEvMYHuxuOSx
                        MxzIXuLBihGAbYxjHXzNgi7rZ68NkPMiARyxRzhDMHsnu1K2D7IrCX0/fn4wHOHcOO8DzDAK/gjr
                        SiPcD7KTo8W1v6J1iXLajzJVcMNh1Vjy10vch8DH4Dzwvd600gP+nFBWUmG0FBhF/Dlxtwpm3n7p
                        Qdla7Dl6vbGXWVC2FLss23LovdJxb49upVxS7oFaVzhqS+tO4fxbYGb9vT0FF4SgGMHMmr3XFNZD
                        K2XJdQmceO+a9rKv7mmNXliIPTfQgzIcYzFH8KW50nvTCkT3BwSemiDIVtPHl8JjaYfuXRyIeZad
                        pP6LxFL6V2OvDmdbCv3rX/72GhdJL9Cz4dDh92iN6jeZioUsDTizyjq8KGsEWt5r6fs9OLNAL1JI
                        inqBMFO2PR8fx+M7PczE2Fzb3EjvBtDQ2XoiR3gBGx2XCa0I5lrYa/ogImqpwunHvcTzvtRB9qCm
                        BtReA8qw5K5Gdv2eoczLlK0cMOMqA5H9EsZlAGadA2acOWulbhjzJoCXfgaocdZsIXHPoQVrx2bT
                        PDCz1vpA5z7qWfZEpCS4JyOxrNq9y1pzvMZ4Ll4rdrbI6nvySlZr+tXkhEB97vvTW/tRRrNm7p9I
                        XQ9Z+hFpp1jbvcTCQ+LtMZfKml0Ezl7pYmCDoNVc2hOYqaIjCoZY5Y/R8NhB7HJE69X6OMqYrcUX
                        GPBmJ9VI13ay38CtcKYZs68AZtjXYT2UMnt2+1AmYved9QGUbyggouuVgaRGqdG6lwUgDUFscNbf
                        IH7jvrdGox6oU0BZzRys9o6hTIIgFpcurmUq8rEJwKDUV2Zly9oCmEcZvk78Ur9N4fmARwNf0zLJ
                        Dl69nrSSSMxcBzcCMwuI+fxxBtDrH5VgTUeg5jlOtaNsvEAAZwIj0S5xApze6IRDBV+aK7k/h8DX
                        6A/Y52r7yBLI0g71W0qBIk9HwrVLgtm9wplQlHIt+/0tWM6odanbxsGPI5RoX9WC/l8UKbXgrBbQ
                        arJi0WDHKBrglX60sl+OspRdWaNOUl/JftaEnaCrHOKXdvB9I4bzpdcdHekOnClef/r/rFJZ7V3E
                        cRZexNu6p1GMoQWH2cqi1ZbP1M4qOxbKSqqUkeNyq1DWO05y1FNm9TdFD2Duc/JUQEvn14ODVuye
                        tI34FRM1IxR6ByI8KIuERBonyOEBkVSAmXcNrBEs3liM0lougVpTsVdFme9oGLI3wsKT7S+prEYq
                        nR60lM7Ja0CZ129prV/LMW4Ke1yTQJb2CmCGiYZH8DfU52ABst7Y96/C3gKcifEQ4sG5CmdY1shS
                        +30FnHmlhqXMWI14SDRo2mueFinPEunElkbmJm/Nqn0bz9GLEdW26s/Tbs+hrhG+8ZrDucwMs7Aa
                        /Hgv09Lh1nEUI1VU/F6RaTmaVQpZgp/S33YqKPN6MO4ZyqJsGWfMuEpA4PpyhsYa9VGanTfHOUQ4
                        wKwdXv9O6isaolleHAxoANKaAM5qRi6URsIcCmYWjJSURWucrdrv8zJqTbCfCZxPoQCPJwRmtQrU
                        DI6Pegm7AKjPNePO6yuLBHC80QbRjNR7FTNKu15AQ19VoQz9Dq2Kw/lma/HHdvyr/SrLGl8P0Ljk
                        UeHss+yELpSw9UGPpZBR6UqpgdyKskZlL33BQY6iiZ74gCeu0IkveSwOeHpORtrtQxk70d5sKe7b
                        UPGPliJXLCjzRBEsCeCsJNMs5NBySWMv5R6uKGtm9ZceA2UlWLgHWfxI6Q8DUyz24YlOlOYwsmPd
                        VULZHEDwerv6AtB7wlAR6Fvy/GuJJfm9zFWUoRkk7pfuKeARZYpqBUsOcbwkgDAGskbsfnALzDoA
                        bm8WW0+wvAn2Iw9YrF7CSPTlHIqcUd9nbcl2DZh1cp99s2nXDWeNAWcKZj+Nx9bP1zYdFARqpdB7
                        lnB2fkDDB546nTgTQZUa8aHPZY2lbJa18Q3Ba6npuSToYfXVeOIDXRDlw3JFTgljmWcnOQTyXu4L
                        y6HGuXmoZKrStHqgIEgPYGZFrzSC9Q7uMVxLnrNrgZpIrLzolfQ2FUGN0kB4SSirhrIaISRPYdZy
                        /BjIvCyZ1+d06PktlT4eCmoRpFmljwgHtdmZKJslYg+B9jJm58yWHXpdrGsQBTkRxFBp0jpvHJDF
                        tVXq77bOFwcRPOGXQexql0MhrQbKvAHj1p7nZXJLfZ3pK6Sd0m+x9gMe//NhhLKfZSqnrwOosfrL
                        zMRfMnv26nB2RqXGGkDjjQmzZ5a6l1XegP9fpC6T5X1cM2CzCSJW1sOxVF7RBnDGQ6i1V0ida+7H
                        84Qc0q5/Y4uU8zBbhjK0CmXfAc42AGYLB8y01wxn5Fn3lxTAzCt1lAKgDRVgUVPK2QROyluGMkt+
                        HdUWuZfMi8pbvbDeEWUezuUUnhLUvEyF1+ODP6sBSGilrnzOKjOrUeOzerK8n3kpR7wmEyR0v+K/
                        PWEiT+TLam3woBrn4nXjz1jAvxdSN3j+EEiLZpVFGd2aTFlbucbSN0g7Fr5qnvN4P6sPsvU9PgKg
                        fQJAwwAz9p5djS3e4EXHzWcDgNY5D33vIcBAVZpH04qf4vei7155YlvxEG7FL6ewnEkuF0JIewJn
                        +6NMxw14CnNpl4si1TrUVpYDyxdfAMz0YKGYFuCM1T5ZAGRpgFkEZ52Us9NSeJ0DYRH08b1aUtC7
                        ZyjzHGLsJXuhA2v8hwqn75qg7BygNkidAq8HTRuZKj1GQhTeM80CmpJYhpUxkwvs/8MMMGOVT08E
                        hDP5uAehmuYhYxSs68vqnAhtpXLRmqBwdG4iwJQgCOW9XiJ7mnZf/ovXV176WIz7XGerbn2PDzJt
                        rUD/dTE+myxf5F92qezZ4o0tBq7lxgdbybESY9OyFJ4WUtf8W6pR96S2uUzC+11c676oBDmrp8NT
                        3OMsY27Ir7uJncqhtrJl1vDGZ9mfDcSCMbxGrFLhltbL4ECabrQ14iSlr4nY2e9ST2dJOjzKlonc
                        R89FSUiA1xCvnWeAMyxb5GHFyxuAslOCWif1w649Rd4eXjfGsyLKDIn4Mv9NIRBorfNLgZklaMKZ
                        IJGyuqKn0tgTpEXZNA8MB5n2q+G17ADUFvT7OthrS+WOc0ZXWOsKra1YA3MUGdPShkKwWCqf4d7P
                        w3tP13BNm05r3E8Xt8UbXiCWsltpen1jbOIqF/4ATqg1Z8eSdeYhqqWGYSsjtijAmfc9USaOf/4C
                        IO0BFjeWN+bGfB4YK6kVzvmZllDDmpxqdKxfZJopi/rLEMyejE1wIXVlL5Gkfs0GHonp9BILBlhg
                        VuOo1mTL7gnKIrjHbCv3J27Gn6V7psC6WNL+eQtQdkpQq8luRBkadUg2TgCRHWpvD/ECgtcEZkMl
                        mOF5mQNm0b7Jc+4UptaVMM2gZpW74jO4l7JwSAStFpRZoypKUF6jNJnP/7SSzx0FVKN2hl7i6hYW
                        +2N/hXuXrbEZV2WLN75YRPZLOER8+flOpiVcmC3A44HgZXkgcFkgFSlAeQ+fhZTn4rQB5JVKjbLv
                        7DwbmLWRMbDMcWj6SjDDLBn2ColMM7d8D2i5AMO7FbWPskm1Q2m9c9RKLCbCA6s9J3vOIOk5g1Zv
                        MYjlOXxWOayC2VfZqWM9yy6zs5Bp5oh7Baws6y0KDcwBtcGBgAjQSgJV1ugUL5OLfX74uUhc5DXP
                        f6Qq650LMQKrXQHMGsc3sGbdIagtCteJSwYtULNKTDFzhu/Z28eiUuO1xDMErfPk+Ril+ZFpaaV5
                        l1F5d+0IGyuQos8jbMNYO3vC1a7bRS6evYek9TDF8i3MFKgiDApmWA7q8kDgqlFYbMVXSypFCPmB
                        7ZVSesqPXKeffWeniypFqoXeBtVUwBk71NofhOWMEZShItIj3AsWlC2c6FRpjdQOpfWyaxak4frc
                        FAI2JSCbu9aHG7ov5kLZ2oCzZzoYznSG5IYim1Yp472ov9UMvG7IiWFI82CNszbYlyaFYAg/3xpj
                        T49Kdi+xJqOh31YmaE7fnPV3NbKv+NhLXcazNN9OCM6tz2E2DUFtkP1emRKYWbOdopEVXtVPZsvS
                        5kLZ3H2spp/TC3aoX6NK7KjQyIGJq7RFriPzgWltVhaUfZSdGsxHB9CWFXDmAVcpyxWVVVnqjV4/
                        TCReUvr6pRrC720TmzP8uBdbqciKCPHMpF7250zx7DKMMrXkPLOaZwRl3Qmiq00AOU0QORZy0lqZ
                        zixq6POeEIJXzmzBVxTgufbh7CUFRu6xYTl8zMKug4evnr+F7A+xF7EFV+4tOl+bUWvFL6fDo6Pr
                        gr191r7BgYgF+AKt+BmV5sLrk3scvRI9mQlmNSXWjdiz7krXyZtv6gXZhgDUsM/X6qEXmSpRb5x7
                        MipjtGYHRrPL8pmfNieQwiq+1itneb0y3Nrs2Vad8Vf5X7VGhbTVtUNawpnfU8a9VigPjoPtfpH/
                        lelUQMNh1kuZlnYdAlw1Wa65QCXOazQXqvZzafM3sUPEAEpDUK15Rhvjwc0Pbywzw3XICp7Ye2gF
                        INozRNlryh8bB86sSHordk+Idz9Y5xQfCG3wvsQAuOaK1qEXJPDWDD8w0fGzIAudyI3xMLYelG/B
                        EYxAzcrUWCWP6kiv6L5bk8NuOTitTAV+FlfmsAxGgMlbh7z2RPxByXOygDVZT6/ssaZsyxvZ4UEa
                        fg3VN2tKGRleS8qobRCYymd+WsmniRR8n8VW9fVgLRoCz78fs2fbEvvPAGhfbgHQ3jqceQ3/mCGw
                        smUKZb8AnP0McIZ9Z9ZGNxe4ROqzXHOAq/bjOV9LOzyytHaOmrKYRvzSO69HY00P7JZAxrofENAY
                        yjp5XeWumvJHdnpasXtGhgN/J4/paJz3ZWXPhgveRyWxjwjKrMHRmGldiC1rLrDeNjItgcTsq9c7
                        9VYChVGmhrM0LMm+BkjrZCcTLbKv7DjQz11IWRL+UuIfCJcrJ6gkMi3LtEZdHNs3VwNq3PPqqXJG
                        59laE72xr/T0dc5Q6Me92HPrUJV5Kfs976nEmHYImOG9yiN5UCjqu0xL4FdiV/IwnPXOM5Tfg7Zr
                        fBuhTOHsm0x70a4O0N4qnHmN/h6Uabbs4whhvxhwpmWNOGzX652YA1wih2W5DoWqOf1AacdtYIPY
                        why8MZXS+aX+KI6s9gQrAg6FFW1eGoenpneph3gJ1ESmPRulHr5IJTNSuxPnfdQ65ec+b3MUGDeF
                        YAH+rBbOMYM6/p3PAH0a1eS1hf//tc7LNUKaBQBen9BG9pX11uPri9iDp62MlHUwHLev8Dzw5jGu
                        Daetl2nJnzdK4NSCJk3weauH0Ctd964JgzpfQ+41i8AMfQXMlllgNqcfLy3NgqI1QNk3gCM8vhqQ
                        9kJ+0PpAOGPlRlQQ/mrAWdTHlnD2ilDmOaARlOmUcYYzLW/0wKwtOK7nznLVbqi56b4OlFklhhhd
                        spQSewcOogHlliMlsl9KyxFxvi+suXdek/i1PMRrMleNzBtkXRJgGSrWQFMBbecqfYz+LqtHxsuY
                        WYN9eY/Tn7mUfTXXflzfa/j7rLWG/697w3uHl03jQEMbwJmX1d4Y6xKde4br7shnzCFr1oIOPLw+
                        Uk9h8FyCJk1wH3uqnNHcxb5yz4nKPddGIA6D0DxX8FoCbWm3599YYPZddoIcn8bjt/H1s+yEOiw4
                        4+D0WqYZ/0gQxNo7rFFBVWWNlxhA/ZbgrDGijSUFxg8AXj87x0/wvQxmtWUBmeV6W2BmlZ6wst2L
                        EdWxhF68dRN9rwcS3ty7aIj5LURWo1KxuUMxayJrQwBaltJkE8DaKUCtpAZqKWitnVeUKG8MsOJs
                        10p2EfhBpn0HGA0Vx2mM1tlbhTQv4Gjdv57jrV/T89/QddNr3jprpjRI/hx7JvetoGPVSHlu5zl6
                        YGuvk6fKWVLlrZntJOJnva0gSu2Q9/Qd0ubeq7r+FMy0jHDb6/VPOH4FQEM4454zb1h6zbPYqwax
                        snG9XFnW7CJwtqXQv/7lb5eAMmt+h2bLOFPGUIaiH3pof5nVY1bbe3MIcCV03V5EKSrNQSiz5nKw
                        QIenZhc5JZ7amjfLy5t1d6vzpixI8z5XO/A6glyGsaEAb9brsaBWgrKN+ENqI4lyq2fFKt8eZJf9
                        UjD7LruMDyqGikznnFlBrrT42uPMOK/UETPgCDjowAusBXb8F/DqDXFtTrx3smOFB4754DV5DVmg
                        uaAWjUzx9qE+uOc5iFIDZNE4lqYyKDXnew71gdKuz8/BcvWvI4BtYezvP47/GV//TnD2TfYD0h6U
                        zQEzMQIgvZQHxO/xypuBswtCmSf2oVCGmbJfCMoQzD4QlHlljHObaHNDus9oEjo33FsWgdmGIp6t
                        xEpaVtQ4KqltpG7QcjQ64RbXbc19aAGTSHkQ+FBwbrzPNTIv+xCB2lBYgyVV0NLMKKsc3IIzFayQ
                        cT0vDVh7kWmZ3iPcBxrw4veQNg/SvFmaS9kX1MBzzPPSNuP/0XWxFDuLdqrnGcMZztHD4BUHkTq5
                        zvK8uYqPNQf23fB+zXuLJ0wmThDK2mfmgNdQsf9J4VmS9/vt+DksX7+Fs20J4z9+HP/94/iv8RXh
                        7IvsZ8wseOqDAMUhvlhNVvqiYHaPcDYHyiwFRkvsI4IyT0I8BzTmhuWl1F8cMGOnQ8DJQJXEpfj9
                        jJY6WTSfJlINbSSea9Pc4b7hAZYHavzazFgfHtR553ruzz8FlAkECEqDahfkpPMa5n40vR/09zzL
                        tOdgLTcwKPTKIa0XW/TKgjMuhcPXlr5naQCayOnLHDmwhYC2Me6RVsrqyNd0vTzhIisIZN3XLZwH
                        VtRsZaqg2jkgbWXf2mAPmrP/iPh9vVGg8JRrKO38/g5nzZ5lV9K4hbP/MeBMs2bPBGUbB6AsiJob
                        OPACqznn7BU2vAjKuK+MFRg9MEMVRitTxuVmCWUJZV4jO0OZ5ZBiGSPO2MP5Yta6q5l/J1LOoInU
                        90jes6NbKi8slSJavWZDBaBFvXHe9bAeNIcAmSU8E/UherLb1sgAS/xgI7ZSYCQtnlYPaa1xHVEs
                        ZCm+GudG9kuBvDWzkP0s2rHOtVfWiOWYCBqRWu21jmKoUZj1IMea3dgQSHOAxQqe9E6Azzpvc0qp
                        S2WZYjyzrN9/yufOcOT9lBYHUThzpv1m/5BdSePfZTpr7MXZ93sHrA65jsMha2HbfpVljaeDsgYe
                        EJEsPmfLEMxwZhnOLcOBuzkHJC16KFl9Es8OmGH0WmRaLvYo0x6cmvUXHSKxSqi8USCb4zh5ICdS
                        LwYilaBWug5NsA4tp9oaHu0N4PZ6GK2DnSlP/IaHiIr4mdq000IazsWyetJ0iDXORluL3a+BAjJc
                        drSA33kooFmKawiPK/o7IuXQ5sb3m2hmowdnOL/RCy6hHL8lIDXXr/HALJrPae0zXPkhTsBnrrN9
                        SICntO+nxUqNmj37DQ7sNcMWDq/McDjyvd2s3TKcNcENXiOL76kw6vegAuNjQlla5QNpjugHNuRb
                        2TKGM5wDZZXQzs18Res21/I8ULNgrVQKFGXUhsr/bz0oLTCywKwmS8a9StzjEw07Z+lznkm1GP+f
                        lRW+9qzHra1bHi7f07VeG9dUryeWWluQxo5VdwSgDY7j18u+RHwXrOVbfi7XgtpQALOoV20wgiRN
                        AXBr4cxSgu0NYPTGtvCoiNbYW2v2wtLHtf6lSJZb1t6nPFcMZ4vhXDNLyn5On+Kr2CWzZ4tL/LEn
                        2rx4M1mQY+vJ4ltQ9pNMM2WWAuMxYh9p9w9mnujHC0GZpcaIYx0eHTCLRjSUYKu0TnP9Hu441Z4/
                        C7SaCqeiZu6atxatjFmkvOgBmSUw42XLvDJeXPMNgNkC9ul3sO8uABTSjl+zUZ9PKePEsxmt7JnX
                        F4ICFc0J9lf83SJ+VkbuBOyjwJAF3Fa/DsNSI34p8zFloVa2zJtRJTJVIdbAo17bpcTzOmsgLOrd
                        qwWzqArllp+dw4l+hjcv0xp9Yc0vQ2DP8vVLwtkJwYz7ytSBfQLAKmXJsKcsUmCslcZPeztg5mXL
                        2DFFKONoUSlb5pXSHjKiIdfreR0nC9asAdjoVHEUPFpjVs9WFCEvzT3iOWWd7At8WKVGTcF558gp
                        r3t97jyNHz+M+y6OJ9F138ntlafdyloV8dVYm2DP2zig5EGSZnIOAbSS499IOfJ+j8JFJUjz9ovG
                        AJbe2BeinuWSs99LPKLD+l0LeHY+wHtcVgTGSgGsSFyiBsq8frhT9FVeAryGE/6OKBvr9RhH6otX
                        aZfKni1ucHPy+sqsTBnK4f/iQBmLfUQKjAllCWWWo7A2IkXPdGB99UAOMWZ7rTJGS5nRW4e5Nq/D
                        AR4kVmWrBTSR/ayFp7BX45x4c8qWMm/guNXfhoGJ7zLNGK9lKpmvwa9HgLOfIECG6z7X9HnWKK+7
                        qDRaxM6KRJmrYwCtKTiEDBu1M5DeAqRhD14Pr5i5QjVHS7ER/5/n+wzBteGAJWfPMEDgDQRuCr+7
                        NGbAWqe9seZ5vSN88ZgG7HNs5XJZtBqRi2NLO2v9IE9UKlJ4TrGnO4IzjvSq48pCH5gZ2wLZ7www
                        00xZrQJjQllaSSJ/ZUAZpvStbBn2RiqcWcIfqQZ6Pw5UDaDh53rZlxPHXq612LPAPHC3pPCXxt7n
                        QRk/WEuKpDyTStd2K9NKhw+wLyuceYIjaadZn7heopEb1h64lnIW9xBA88p/o4xtqdS3eUN7jCUc
                        0gcQ1RbOHV/7Wjizsqobx4EvjfBonP3HK+HsjUCWVUYnEguiWAq1Ooi9oz31NQKkg3MvetfCAik5
                        ARRZcLaS/R4ykdtTUE04OxDMsDfnQaZCHz8RkP3OADNLFr+UKUtHOKGsxiF9IYf0mZxnEbsM1xP9
                        yHLa+4c0zyFFp4plil9kv44fRWXawtE5UIZ9tVZgSozghNdjySMiNCiB6xr38HcAZU9wH2TP2eus
                        zRIU8ccsFNJXQJLIVPa+RlgnmsXoOa0iby8aXxIswvu4c4CrcaClBM4isVQ+AgwHkKyMJ/t6PC5B
                        xM7W9A6YYRCLs3NNYc/sCoEshbTBgbRTPKuHgi9SGllQKj085n5hOLOEzkT8vtZoTSWc3SCYLeCh
                        /kGmMvi/hwPBDPsZUhY/7VAwK0nkeyWM+mCxsmWeTH4nWU57r5AWXUtvzVnZWVxnIvviSAxknqPB
                        2TLv4WlB2RoeyC8GPCKY6T7OaroIZanYeJm1OYg91sADM4b0lwpIWxAw1GS1Sg507otxMAgHv3fO
                        9+u59Ia+l+Yqev2MDIONEXTi0kpvFqMlPGSphlqBUxai4GHd1v7Hn9f9ck0BVNyrBjlskHZTeA54
                        kGVlrT0hGG+swTFZNFZp1OHTXDFhBVqaBLTbhzPeRBDOPo4A9ofx+OP4qnCG2bL3krL4afM3nlqJ
                        fEuVTmQ/2+tly1J85m05wtFa89YbZqZeYK2hhHlLe+VS7CxZpMTolY5tgveEjhBGqBuZZuSi4ERJ
                        FTftdQBNCHw855GdvpeZDmAEaJ6iZKRWmz0sPqRh/1kEZ55ynjfD0SrRHoxrqD9/IX6ZI2fUvKHE
                        Xskiq9NaVQZr2S+5WwSA1sh+Bg0rXJZiVx3MEe2KSkatkk0LTK0yUiubaCmsHgto+jO11/iTA2l5
                        b94hnGG/GcPZzyOM/Wk8/ii7rJk2mL+T/b6yhLI0KUSsrOZmVmK0BkqjsxzNLbP6HDNblgEAdjA4
                        K4UlOgMFAbhs9iEAM0+FsST4sSJAtKBMxO4RRjjzynizz/eyDr0QoC0q162n4ug9zweJswtR1izB
                        /XA/issMretigZYHEh7k45wyK6vD66QpQLc1EH1lQJoXPLJKwBey33vXQzCK1yHvr0vxq7BK/mVJ
                        TCQai4L9x94cS+vVGqlyKJxxRYVmz7bzzHTg9Fepm2mWdoNwZkXOdB7UewA07TXTrJkKfzCYZWYi
                        rQbMrBIu7qmxpMJxoDTPLbNKanNNvr31ZcG/VS5oORhrY53hentwAgAosFFyIMQAM4Qya5i6lS3u
                        CMiW5NRkGe91Q5p3HSxw92bqedkUBMBmBlA0FWDGPUy51/jlpjVBo5pSRwvM9Gd14kv489w6zmQ1
                        zn60ccDE+lxPASPeozrjOczVAj3tudw3bqkrcyVDNNjaEj3pjf3XKh/nzKBXGmp97RRwxs+J7bPh
                        ywhnHqBJAtptw5mVCub0Mqs1vodDhT8yMptWu8lYNe2rAMysvp8FgRn31HApRDqlb3ON9Y5zy4qM
                        KwOA8MFvZctY7KgmqmuBWQ+Bie2a/zY+bL/JrmzFCkq0dA9YUOaVAuU9cB3PXpRct/qVLAGGyDEW
                        OWygr/d/5kLHW9tnvP3GAiNPbn4IwN26V9vK98j732DAD+4LPEvROxg88JncyrSqBXvJeOh9P+65
                        g0xLtnH/xTFOpd5xy+9sCmsbFXrZ9+CqHa6qWDtwZp2jY2GJe8/0WbF9TnweAe0bncPeCSSk3Qic
                        WRs0R9w8yVPrxrjkXIq023CavaZiS/QDHWbuieRsmacMmk7p24OyoQLKMHuGD1LcwzhDxWU2npNg
                        rbdGYjGS5/EBu33YfpFdT8EKnCrMjHUyFf3wynhzXMltApo3z2olflbEc0pbKatFWs6giC/l/9ah
                        LJKX3xTgzFNe9K6b9T0i5Qws9yxaIh0tXee1Ebiyhlw3BGUsRoPCSRgoauD3DPDzvwFgbMB/fqgI
                        wHbO856Hv7cEh71M50Z+g+DYV/i35ZN4cLY5A5x5wbxnCuY9y7Ty4ybu1UsMoL4FOBvEV4nyUtvW
                        zWrVNPPPT0unec7sMs6WRf1lCGZZwvU2nSXPSWJnA4GMpcr5Yc6R36UDZREEeUpsHLnVXgItV/k8
                        OgxreJagIl/U+1YCxbTrBTRsLRgcOFuRM1iS1Lb6zmqGUOv/2Uj9QOy3AmXeXmOVu5Xg1psBVpqT
                        VyOM0Qcg2Dp70Ur2e28twLPmglojRbiEcg0/X/+tQhdaoocqtAhn/LyPetFa2R8bgL7pBvyPr7D/
                        6oEVDB6c9cE1PxUkeWXOlrqwNQst7RrgbEuhf/3L3+ZeeEvBjMlcF+wTRGibICJQW1KRdv9gZkWA
                        Xxww47ppzlzUSORntuz+15a1d/GD0ipfRAcKH5qd41hEg6TZEZDKNWcB2gsB2heAMx0o3cl+ORFX
                        NrQJZjcNaLxO2PnXfbOBvdSaK2UFqNrgme0JSTQOaNw7oJWgjAUySuV/3owyBLHOASiGjag/0BL7
                        8Hw0LmW0BIisstlW6uaXcYWVnseVTHvlFM62Aalfxz0Qv8fLnlktDJ3z3qz3oXCGPu5nODAj9UyB
                        kUgYpKZ89VhAs4I2vB9c/T16qazZReDsyIu/oUjudrHqEFONVvCgQjwitcaEtLfjPFtO8zoAM86W
                        lRqDuUE4miGVdt9Qxmp2luCHNyRVJB6IysexUFZyhq0REhv4HUt6AEdyzVm1cPuApuvjUWzRgkHs
                        UjPLMfYEabzgLPZfLsQWIcH7srnjfaYPHGJrj6npB8Q9ZKCv4XXrxM8G1cBZ6e9ayzSD9N15Fjf0
                        njyxj854/5i9xfJxzF5tQejTCGe/0d63mBGYZTjzIHEAX0ThDMHsi+xnzaxr20t5HtpwwnXplRtz
                        tq6/9hvtkmB2S3DGTrRmzND5xYgDApw61rVzzo6BtJpFng7J5SONQ+Fh9hxE6URsyfJHipgtJEU/
                        Esp8NTurjJEb460s2dIBslNBWQ2sceBL+5FWzsE9liLxHK28N64b0CxZce7R5RIrHvmwcJ7B3pw9
                        qxdY196C7qFbyZwdK8DgjXpBAQvrWnAAyIIbMWC6NB/Ry5yJxL1o0fO5J0hBOBtoPbXG/mjtk1ag
                        VCiIwLO7FI5+FTt7tpT9jNlDEDhrC4EKhDP9/VjSiP1mLBhlZca8AfHDkWux5Gt570EkyxpvHs7w
                        Qm7oRuUyCISy77KvarMFNEvOfA6kDUduslEkL52S868hS7bckqhF59LKlmlgALNlnjpejfxz2v1B
                        mdXvYc2n4dlgVqZs6YBZe2YoE8MZx/fF+zP2GbAC2gDOtNckn/vh9QOaAGgtxB5QjnvpAK9evw8/
                        e2t6gRnOENh6uR45/eGEcMaZCUtR2BtWz3uN0F4j4pdNW2DmgXXUaxbtSzxw2lKKVVEOHnCPGaxl
                        EMSyxOGsKhoUQVIgUuXBX8d/8/uw+n4XDnxZcMbvizOGKATyXaazVTGT2AcA5mXLhjOtef7d5/p9
                        J7dt+1WWNdZfbL1xrLpl3KA8ZZvtTDSdfYaQ5imI1S66OQvOmw+SoHZeKPMk8i0oezEeZJ1MZfI5
                        W4ZZ3MyWJZRtHDDDj7mJ3QKzGkfjHFDGJUy45t/Jrlm+k51QhMhU3ZHLdPDccFaZo+65H14/pGEv
                        kmbPtPcGy8K9AJdXXdBKnBnSn633Vyf2HMDhSvaJGn9hqFzzVoknVntY8uoMrZzdah2wWBpQxjO8
                        omHLpcHL1t+r72+gvQTHeGjGChUWO9nPXC0D+Gmc88lQ9hmg7JNMywp1DUoQvOLyzyYANC4l5X7f
                        7zIt7VxJeah05K+eE5KOTWK8ebulskahaAqDGUc7OA28PbbDqnU4tc5CU0hjZZ1B4ubVQ9LDNTMu
                        EtTOA2ZWWYxVwmg1sVsDdT0VupTITygryRdbQ009MLOc2E7OnynD96Nr/p3s9/qoPDKqSfbjvdSR
                        o6Hnw1OUZBW4zKZdL5hxeeMAgGaptK3FLkXjDIM3hNdS0I3gzBK6aF5xj7CeQVJwnCN/IQIzhTJ2
                        3l8IjLk/ayH2kHhr3+kqoKykBFt7/viasyT7Gn7eUqbzFbGKxasusECXoWwLYr/BgWCmAX+e8dgY
                        58mCMu7r80SSWABvJXGJ6jAT/l8Lym7WLpk9W1zijz3yovPwut6JMGDWDBspFdBKkNYFNzM7ZKV6
                        2sZwejxZ4dJw2HRO6tZKTVmMVfrBanP4ELMicykP/vZA/xAo4/3Cekhboh+d1A2QPvU6Yzh7oveu
                        JUTP5KRg5Hcl++pjK8cB9KLymU27HUDTNfEk+9F+LEP85sAZP2+9Pk3erxcyLUXnrPRrB26iAK71
                        dcupte7vwQlGW4OJOYvYGPvLg/NcK5UDlqBMKn2XSNmWIR//vrXsl2IuxJ7x6LWrWCWM2Ff2zx/H
                        P8bjn+PnPslUIfFF9kdFNFJX6tk4/iAP3baUNz1l0sxW3ZEtbuz9WgMWMf3LPWescvMJAO0zQNrH
                        EdC03PFB9oVGROJhjr0DaI1z47JiUM0mmI7JPCe6JJH/YjzI0DFdip0t8wb8ZrYsoWwt9iyZ3nC6
                        vKbwUgP7uaFMKDixNAIW2m+JJTbsqAg4WULOUDQGwMqoZTbtOgFN4PosxmusgPY8vqpTLTLNnnEp
                        XUfQ5w1oRwgbxBZv0vuQ2xSaE+8NIvEAaE8UQQrBXAt+asCF78VW7OqP6JkWZelrsmRz78soI8jw
                        +SzTnjSR/VJZDph6ZYz6e7SfS/vJ/v7j+B84toC2zZ59kakIBwdzRWKFSuucRZDrPW96sYdHJ4id
                        wS6VPVvc4LkaKLIW1aUroGFDp0Laz+Oh5Y4fAdJwVhrXAPPcEHTIvBkrljO2kPmy2BlBrnOk+2BN
                        eGDWG84nPrwiwY/Mlt3vWrLW1Bwo47Kq0rwdS6a6ZoD0uZzvjmANG++fxJ+xM5DjvobzwkEpBjXs
                        eemCe+0tVRfUlMtfEtI4e8aDeZewTnrZL63jZ20r01mAXhbaKlXnXhyE+2MFQmqyZL2zZ0RwZp1P
                        hkquErKgFAOMC7GrP0pljJHQh7f/NEfsr6gAaz2reciyiK8oaQW0+HdjqaAFZv/94/iv8bDgjNeX
                        VTpbOkeN4R9a53Fw1le0ftLuwBY3+r6jTdGKvPAQv08ybfBUQNt+3wcANGtumvUQ4MF/Hpx1Yvcv
                        Wa8WBHQZQa5aCzxTyitj5IHSluAHin5ECmMJZvcJZYPYs1qiMhNWimsLTkTN3KDXhjI0ns3D94il
                        bsrBKoF/r4yg1ULi8uFIofLehJWOadp/7b+3VN6IgIaZHUscpAMIwQHADPx8X3iB0zVBH4PaMVBm
                        Zcl6Z7+I4EyMe9t7r97fyM8wvq+Whr9RUn+t2XuaI/fXXuy2Aw/KcPB4VIXUEphZZYKYMduC1z9l
                        lzFTMPvv8XNY0mgJrNSWEzYz/+35OHP3hLSEs4s9wKxNcW3c6FYWjUVDtBdNs2cd/I5Idt0avsqR
                        MHRCOCvzCA8xa2aWpTzkZdPeCiBEoh9WA7kVZbQk8nmY9INktuwtrCOR+eqL0WwlLCmqAbMSdLzm
                        GuNeFxFbtORB9kvO1nRuPFEUdritwAjuh6WsdTQ77Zr3xpKyX6kvaTA+lgutFYZ3zp4pcLxQQAzh
                        bADfxMoGKVhg0JMDqHi0EGToZ95PkRBQCci8gE0EZbiWB3q/HuhhGf4C/tauAGVWn+chvWTHQFkE
                        Ztg/h2WaHMxhpW2vRNBSZPwEYPbfBGaYNfsq9gDsOYGUwXhPx+4VaQlnV+1Y8cOprYA0FQthWFM4
                        e0dwZsnWPkvciDwYUR6ODj/R8U52vW9PhnNi9Tp52bR7BYbBcaSjWTuWGqMY0d5IIj+zZW8DygbZ
                        z5R5UvjeQFcPyqySZcxMXRrK2OkeDPDBvWwz3idr51jR/TjIfvUBOl6cdeGxJ546qlfyOOccNq+0
                        1qI16EGA18fsBemaC60XLgvn8sZvsusneyaQwLLGR9mVNgrAx6Ps1Jr1VddD4wAanpeu4roPjo/h
                        BW48KItaHUTKvUil64jVNC2AHMNLlCUr7T3HrKUSlPWwn6J68rMBZiLTcTZPMtUHYPEP6/px1uzL
                        CF7/ADD7PwBm/xy//ll289XWcvyQ8wSstDcBZ96DrZRFsyCN4WxJcLaqgDPuNWFnzYMzhbL38Pqe
                        QO1JbFWlqNTn3uChRvQjypZxtNHLZJZEPxLK7hfKop4yK1smBrhEAh9Ro71c2fpqDIcQ+3c0G7Ew
                        zhdXGmD/mYCThKpnuj/qfvcM+2OURfP2wNZxhF97byxJXEcAMBSeKTiC4FJVFI0DaFbvGWbPBuN+
                        0bW1JKh6GJ+Jzfi1lUznrCmgYZVL56zh9oAA4FAAsI0BbVEPuqfW1xZAo6O10ImtMOxll2pUX0/R
                        lxdBGQM0D8/GfQH75xrZjfV4B/vCQuKh9jw3DOEMM2eRCIjXZ5aWlnB2gNPVV4Kaqjr+JtOes06m
                        szC82VjcDB/1nC2NyCLC2QfjlTcjLrlbSjxs8R5gInpQzsmWNVKnXMUOQ4LZ/UNZXwAydMDmQtlr
                        OEavAWlWqWMLoMYzzV5kWh6+gp+xlmmEvIX/g3srgp4XoKpRmCtVGJwC3uaUKdYISbA6GwIGK1yK
                        7PfavHY5LItQMKAtIOBpiYPg9VsAfOG+/UJ7ekfBVAQ0Vr/DbBOfI8+HGBwo8/pNS1DmjdHxAjYe
                        1Fm9eCy0UxIXO5WPUAtlrMD54jy7e1gD6EM9jn7QB/CHWFTG2uetzJkKgaB0vvaYWWA2JJilJZyd
                        3gnzMiyo2oNqjUuZ1ntbm8lKyr0njbFxIhRgZuw9AJl1vJf90kfO9jBUtHK5foRTXk8vu1ECM+wt
                        s9QYPSEWK4KZUHb/UGaBGTpkQk5yRw6ply0rqQ3ewtqyshD6is6YFdjQc4iOlACk6XDZjXHNrL3b
                        K9eqLXeMysiaE+9ZXil2BGWW4y/GPraUXfZyMBzx19r3o94z7B/EoKeWNy5kJxqC3yeyX3Gylv0e
                        74buxUGmYxz4vHtBTO86WUBmjctgQGmkPHi4NBdLZFq6yIEQBnZPJKN5hbVeA2XeaARuDxGZzjPj
                        bKwGsx/Fn01r7SE4bkmD8jhkmiXzvUqJtLSEsxM4ZT1sbFbGBafD483eUCSON5e1+I2/FpxZDa1c
                        m//egLSPBqR9ELtHjQUsBmPTam7sGka9ZZZAi1XG2BnnvKQIl9mytwVlUaZsMBwhK1NW2w8lN7yu
                        rPfM/a/sGKFEvleSLWKPLlnJvnKufm1RAWhRFk1O4LiW+pQiVT+vf6kEZxjg094/zA7JhdZalD3D
                        51MrU1nzZ5lmxDBT1hlOtqeQjOqMa/p/CrEMaLju5AAws0ZmiPjlinPXpgf1fP95Wblz7DuHQBmD
                        GVYdYSC1pcAPj2l4dIDfK2kcjH2DVZyfpSzuJsZaSUtLODtiExlgw7YcfQU0zj414mdrvMiZdzPj
                        JsylBw8BpHH27GMAbO8CSLulUsdI9GNdAWY8a8nqLWMlxoXUz1JKe5tQZpUOzRkcfW+9oF5mxssY
                        WPseCzy04s+/8hxuvJ6eAmYtnB1yz9cofg4FGIv6mRDOWoCzB9kXKRgI0l5zNubc7NkqgC19TiLM
                        MaBFEItBVX6Ge/t9LZxZv6txYKwRW+a9kXLfqQeNpT42r3SxOeH+WjMHch0Eta2KIw/KFuK3IFjX
                        sjbQy1Bt7Ve9+JnwKECTdgd2iQHUbwnOLEjzepY8kMFBiV7Db6kWmTfOzogwRr1o7wHK9PiJXj/A
                        92ITNvekRY7VtYGZdZ1qsmUi0zJSVmPMbFlC2dwB0qgY5vV1dG8Aymr2WS9zhE73EzyLegfOPGEe
                        dNLx926kvqyxFs5q1BalsOZKMGZBnOdEduTgDhWA5o1HOBekRYCGwGX9zVZQDYVPOBMSBU03wXnn
                        0ltxnj18rQbxlTO9wEBNpix67ni9izVqj+eEMiubGUGZFfxqaJ12DphZVS6d1LUfNOLPVsTAwRMA
                        vX7vWmz1TVZRHRLW0m4SzrYU+te//O3anH/OyrQSp8a9h2B0U1qNvWvZL3WwMjyo6Miljlso+5le
                        t8d32ZU9Yibtkj0Jh14XHihdypYNFF3maNuDxEqMCWa3CWVDhYNcC2UCDmJttiwS+7jH9RQJMFnj
                        B6yMiCo08tc6KYsZNIZThuVeOCeq5LCWwKzW6fIyLmuJM2I1zxN0xq2srhXUWhqAhsdwxvXpSetj
                        9mwh+5lQKyCyMMDcKnNfAAiIc671+yMlXi+4gOepNRx+bxhyI3EmveaZU5qPdUoZ/HNDmchUXdQr
                        E+cy6EOG0TdOsACFRT6OPhNm75eyL+m/Fr9aanCSAAlrN2qXyppdBM6u1LHYwAMvKmuxbsDam86b
                        cbKhzVvlf19gE/km02waZ9F+G8Hs8/j6FQBNs2m6OWJJiVwRoJVEP1YSDwAvZcsiJcbMlt0XlHnq
                        arWZMqtH1AOzVspZ17cAZRGYeY3+mg15NJxxLyLuOaNeBiLao4eCYyvizxqLzkskMmNlX7wZWKV9
                        CUUvGgNQEX49EQwrm3bsmm0cuLLmSD5LXDLGc/Va49p0ssuCrR1g94KqPZ2bEpi3QfDGgrLa+XvN
                        Aef32O95DSjDdc/BBGsOJO+xVi8pA2/NeeRAgfpRP8lOjXGQ6Tw9FQb5LvvKz1z+HgXtE9YSzBLO
                        TuBoRA/C0sfHbH4Ih5jBW8hOzUofaF9kV+74QXYqQ6g29DvZKQ69QOSnhwc3P2CuAcpKZYz4uqLN
                        kUU/SvXpKZF//nvqVM7GHCjbiN8jWoIyLk2qlcVv3xCUle5ZC8wws41zix7EH0XQSayk5wW9pDKw
                        NhRAy6uWkALweaIVkaKvSFk0Irp3+gDSWASDVXylAGqHruWmAtAWEBy1evQYVFvjfEczPvE8Y7bD
                        e8Zb57qRcjamrYSyaH9orvw+j+aUzYEyL0NmlYl3R0IZr0Mccv/RCRihX/UVAM2ba2v1IZay4glr
                        aQlnB4JSbY/BOaAQpYE1MorZtIdxw3iS6QBtBbMvshuuzWl5fuhdsvSqViIfs2XWwG+R/REFLJWP
                        ZYwpkX/+IIdUONDNTFCrcRoip/gcUFbbL3KPUGZlKNeO47YhJ8jKOCzEny3oOTgerJWGO3P5Y+nv
                        6yuBTgprMepXiubkWf3P/HNK8vELmaoW187bOwbWLOVG3pNXYpeCWmI8Inb5YRM808QA/JLaXs05
                        iQZH15TJN1e+h1tBr5L6ogdl1r1uHaXg16ECJwxn7yioq6Mc3o/Q9ol8KQW074Evsg6eOTWwdg4/
                        M+1A27ZfZVnjdTual9oYG3iIYjZNFa5U+vX7uHF8AyD7ShsKZ87EeIC8Znlj1PPHZYzeTDlWLuNs
                        Gb5GvSsJZqcHstKDpzQUmK9JqbzGK1+MHOOEsuOgLFJnsxwVzGyL46hZ51och7EG1koDnqNSpF6O
                        k8vGfZVl3gfje6xMAvfXiAN/lmO3kXIGrUYsxXomeOellF3qjD0aJfUHsecLepDGH3fOviEU7JQA
                        qOaqerbOx5Hy4rXv49ZzuZeyJP7GCQB7ULaU+vmEx6hO4v8fZFfuK/C+NJu2zZj9RIHuL+BjIaA9
                        iz2jjfvsajJsc/QL0t6AJZxdt0PUyH4/HEPaC4HadwA2TMWvDaDhTfASYGaVSVhghrNHeGPFiCxG
                        Za1sWUrkn89p97INNfN4+CFs/b4+cBo2FVFLq0zqFFB2b2A2FM57zbn3ZnNZIg8l5TXLcSwFArz5
                        YpEqYgSf+LeU+tiGwu+cC2YenFnKhLgWUclSjHsnElopzdySCmCzhD247BzhrKfA3Fr8MlALBEsj
                        bKznR9Qr1hxwiNzmuBqRuEzZqmaxMuMc+GJl26WUe8lOOTCb12tHX9P39Qhw9tEJdH8jv0p9qxfy
                        VV4CaOMAVh88q+ZoGqSdwS6ZPVtc4o9NOziihdk0q/yPBypitgnL/7zI7LnhzIvKlXrLOFsW9ZYx
                        lGW27LJOe6m8hSHIG2Lsldd45STeANGEsnnOWi/7vXy1IDw4MG71mUTqa9YeYjmVEbANUidVH80j
                        qy1rrOlXi+4D67xweacnH2+pCg4EaZo56yVWwfTmZVnr3/qcN4rCywp6zv9G/GHAQoHFNoCzLtiL
                        aqXupQBjt5YlEykLKa2N4KmnwChijxs5BMpOdS4b2v/xmvFwaxVa+0ZBbnx9psA3DlDn1xexe+Wt
                        LJuXYUtAe4OWmbPbc5pQRtmCtLWxAfQyla/meTOqXti8wvuPBD+83jJPidEqYSxlyxLMTnsNPdUu
                        /Lg3wJof2qygyXAWSbSvpW5wdKmv561CmQcWFmyXQLjmvHvnPBLoKQky1QBbX/FxBHE1syxLPW8M
                        DJy5iUQQJAhsWeW7Fizh31IDZq0DZ9FsLQSm/5+9N1FyHMuVtEFtEblX9+2xMqt6/0ebMZt//q6q
                        zFgVWjil28TI6QQOqUjtcjejRWasEld8B4DDrGyNj3AWjUwpZc+GABq+jyx7Gb33UQ+MmV1OL1l0
                        zfRleFcJmK0SKMtGjuwCZaMDAm4VLNBFZjU+sugTLHIjjM2tmzWb06L4vOdzb8HPRgvSS7guBGgn
                        0qmyZ4KzywyiENJKD2tueMWbz0fbzkDz+TAj2/9w0mgVnh/Cbxbb4y8pkIhKGLmMUdmy4wXt0Wpq
                        VsqxtmHz59BNM5pnFDmEZb0OVRLwCsr6j28pQONMzXogCP/MbLisnK7UnzE0o1bKtPGMqz5L/j5o
                        NCubSWSZHAuuBz9GE+sa3vBxiV5fdr30ZdFKWaNq4N/iYe14jS8SOIuGcfcBGsNZ9PN9/WJDsmKX
                        WroYXe9ry80tsIfUaD9npbm7QtkhB6PzeZIZ1mSVPG/J/xm4MrDjf0ebfx3n4QrQbkyCs+uAtKy3
                        gZ2INjC2qafezEJDm/17i13E9h30seFHdnN7z9wyDOqVLTtM4J6V0i6sXHcfHU8cSutD1j2by6W2
                        dQKD7AyGK6NRv8Ouw6NvBcrM4vlFURnTsrDPsz6TKFMytt0Hdvcdg6rnPWbA1gdv/L19+7Tvc1m/
                        Uqn3K7r3Y3niKvnYN6MtG+cysu7cz13gjAGag/oI5oZkzoYE4Aho/O+68Bp2yY6d+z1hqANpNHak
                        r1y5gvixIjAbMp/s2FCWnR9Gzxm/lqaWz2+LFiKXCbBFgMYghn1t6A7J2XIToAnOpMsOoHllEGd3
                        oN2+w1kUPB8rqI/64/z7LFnRurN+i3xB2X6PYVSGyseOjyPX17OVOmdyfbuHY4vlTlE5IwYOXCqG
                        QcK0AAmCsn5jnlKgjEEWX6+ZE1s2Z+s9+3uXgby1lcskh1jz7wpnpdeUOQCa9Q+frgmixkGwPWQ4
                        bvYeV9Y/ONl2eL3rwjnE51/Uc7baYQGRA/Cq5zj29dBd0r1gl3Eja4vHjJT6R7OM77hnMebUUNZ3
                        HNldFUEtA9eoomCRLDxnpm0OZA/NdgfQa9bvfCwJzqQLuCHj6kpl27lobLOPFvtDa/rfC4p4Y1sk
                        gX1kXILWy7MEzLipXNmy/Z5PXIbqx48fMtGxzGyFMZs7bWCMm6v9OI8peMuapTFoGFu7j63PrllQ
                        lhvzLIJAmbNl4579PnSfH2J/VwO/1pdVeg987fLadulhwnIsrp4YQXAZwVmpzy679w+B077XW8M9
                        hBfhOGNrlvdN7/J8qnqAbWjAfokxQDajbG25kdK6AGRmeQlutPDCvcPnAmVDzxGzdqa1ZBKUGafw
                        /TOCtBcAsx/N4uTEumW+eIwqE6AJzqSLDqpLQMROjutgJbN6598uWeRH6X7MrLCjZGReks0uE5Tt
                        N4DnPi8/djhXj8c18LybqCyE+yCjhugPtu0/GxGgRU6AUaaMwWxi3T4XQVnZTCjKmJnFGcppst+H
                        WmSfIhgb+vX6yK9pCFQypBkA2hDzk1JWrfSes1LRIYt0S1q8ibI2ZuX5WbuW31cDn2nVlVzffVAW
                        uQKurNsXaJYb14yTf2flyucGZUOvwQjU+mYnrpLnH4Mawtnn5pk3hb+Lz9w3i3tPJcGZdGE3a+5D
                        GxJ0vTdrNsQwopQxW1p7MCg6Md4FYBYFfQKz/T7k1wGYcY28Z2PndBzrBJ584xV97pHxh9kdBPkc
                        hEZmHxGUsQPkrj1O1w5lvNIb3Se4VyhyOIvcUhGGK4vt8c9lnw+BtvrIf/O90MEZopIjZfb5UtA/
                        5GuZNfvSupUSDA+1xZmz6Dm1yyLiNY68KEFZCRSiAfF9TqLRxt9T9TyTL+EY9IFanxts39gRXujc
                        wNk9xOLL5pn6As/ZiXXHaUiCM+lCb95ZnXnWsxPdfKoBf8eChwIHfZHpB9v8Y6lbZvfPbowaKH0Y
                        MGPTlld4WHiNPJfG1pa7sEWlHhhsLeChbsFrGQcPf+xr6CtjzJzvrhXm+8Ye9DW3s+lH3QNlXGY8
                        sfPJlp0LTJ0ymMSMWmkG23ucLEvldFHZV+n542AYZdx3MQW59vu0Wb8d/ip4Fmf73ugazWBsYt2M
                        WeboeQ332L6sdt/YjAzW/H77atvyfX8Obp6rj7btvZ4Ezy5JcCZdyQ09G6T63kbTPifGqDE2Gipd
                        08NgaipjPNUDfx2AlNfGe7bMzWSeAczYvIX7jSprZ28zOLfg4TUiaIvcwKYWG3/0QfwtQFm0gp5l
                        yEpDZdGBMZsvyEBc6To9WTBZMsMYAm1mw8cL1AFcrS3vO8vmEGJWIFtI3MUU5Fqva7NhdviZcUVp
                        7Ehm6pEtdJVGLFzb9T601HgIrPl92MFr3TwTN8/WD9adP1tybpUEZ9KVBnA/+/OZwxtnyRZB4DeG
                        oG+WbNFwYgV8+wezaFXvlaDMweyl+R48jl6Geg8PF2xuxkwc9hs6oEX9YBEURBmyoYYf13y+lBxS
                        eXZUNE8wcmzF/R+BWdZfVuk6PZtAss+1MAokLQG2vt41ztzw+ZkNgfdtaXHf9D5Nq64Bynaxw19a
                        14WRS5RHyfEY03WN13dp4aW6wetsKKytaT+u4Hl5Z/litHrOTqRTDKAWnN3Ww3rItsvDIupLKrkw
                        4kMhW4lnKMtKpBTsHQ7MuFn5yeKM2RqOoc/QQzt87xnzrBf+fjaEiVwcMXN6Z3lfU5YpO+cep0NC
                        WbZg0ldaHPWUcckoQ9nUyllKXafnD2qlQNIKcNaXvRkTIOA5sbL2jMM5LPYsLR6hERmC1DdwTTOU
                        vdcOP7rGS/PJxjsuduk6HwZrmCEeD1hcLO13AdoV6+hwtqHQ3379XXv+NFDGDbylALbkXMZGI2wP
                        mwXeHPRlA6U1u+z4YBa5SG2g7IHAbGHbVfBJE1x9bLZPzUeHM2xk5tLGzBSGM6nZXLs+KLuFwCEL
                        3iIoixZNMgfGyH2xtP9HNwTD1whqJVgz63etyxwCEdQmti1VNoIvLHNf0Hm0TsAsex/XcD2b7dcO
                        P8qURb1l0XV9a+62x1oYiRwtMxMWPCborGkCtMPzys3AmXT0G0OfFe7QeubMFhmdhdwo4sW6/Uge
                        4DmY3Vt5oLRMP04DZl7GiJuDmZcd+WDz+wbIcMNB0myFzyYxC+s6PbJjZ9TXFFm03xKUWRIY942t
                        QGdNnimIpYu8YDIbCGVaPLnMwDGDNbP+7Fq0jQkSJs25ydeuWdepcQ6/g+9T11raeGg7/L4ZZUMG
                        xQvKfv56qy2uWOJjEt2HZ9btBRagXSmYCc5u44bQ1+wbOQFVhYcHBvRzCuY9y+IZFoNA3v8G9ybd
                        WT4XSQHfccHMyxgf4Fg+Ncd5CcfTyxgdyD5bO2vGzcwYcHC5HQ+otuAhVYKyS5ijc6hAbki27DUA
                        MwZhDAburJytLC3q6Bq9HljLgG0orEWljuzmWVnXwn/UnKMTa2fPsozQpc8nK0HZPu3wsxll0Xyy
                        S7fDP3dAswCecQH7vnm+ekWKP38jt1IB2pVKcHYbcJbNKxkVAC16mDCceUC/mW7/vdkczlYQyFfN
                        DadkHKG+lfMCM8+YIZhhf9ln2DBjdmftXiQu7cCV9JnFK+IYIJQs8W8JyqJFkmjY/ByOqcNZ1F82
                        SqCslM2+1SylgC2HtQzSRhY71S0tzp7huflG1zfbkq+v4Bo2i/v59m2Hz/dQvpeWLPF1fR8nNhsT
                        mH1snqv+/M3GSNRWHgYv/YQ27Vcqa5QO+VCNAO29pYP+8PAg0GdybKDsj7+3v2ybabEm0LPmhpOZ
                        PXjwp2zZ8YJ6Nv8ogdkKjt0dPDj6wGxE8BSZwawtL1XCvoioPv9WoSwy42EXTMyYYbZsbe1sGfb1
                        3SfXJbsw3tq+l3JYY2DDzFpm2T9OwAyhw3tURxYbYVxiWeOuM8r2bYdfMviQ0cdpriOeG+mLnjg/
                        NBq8HpW9Slcmwdn1r8yUas6jlfDSwwXL0ryk8aGBsz+b7akJFr15dWZ5LxHPw+oDs/qd+0Fg1l29
                        xh4zLmX0nkEP5qcDwGxWADP8iMGbP5yiWXtVcg7fWuBQGl2B2bIIyjBbhsFAlC3L5gqqr0x6z/21
                        Ss5fPJeiERvo2lgF965LK20sQdnaYgfGQ9jhR6WLtzKj7FyvG7wfe8aMS8+Njk2dnAsCtAPolNmz
                        ySnerHQSSCtB2ZCAK8q6uKsflzU6lE3gJhP1EPEqatUDYvUOkFYJ1NJj5yWpaOSCM8zQKh8fHJ8C
                        MCsNzCwdh3rAMa16Pt4qWEcuqdhbtoAgl3vLZpaXMUYlxspmS/uCNV6AWSfn4oKg6xIdG/ucF9kK
                        PwOzfdvha0bZ+cRkuGB91zxT1wUo40U5nE9Z7RAbSRcgZc5u5+HIN4WhK+F1ECRyr5KbgTw0Ab5/
                        7wJuHKPCwyL6+0Pm7tQ7vs9rnYtjPccuMnLhWWZsle8Pem9MRij7SGCWDSAecn5WA+DsFgMH7hHk
                        UQSvcAyHjK+IMmV3BGVRb9ktQrF0uOcRXu+4YBf1N/L5XwK0c4eyqE80G7S9su6Q75+1w1c/2flc
                        D3xv9paBCLwN7v343PbSR69Q0tyzA+lU2TPBmaBtl4cOPkwiG33PvPhNJ5qhlM1EGmrTHD2wshki
                        t1ySlTls4iyzZzhmDGaYMcvAjPsFRzvs31sGr13BjAd447F7BjhbwDXHLoz3tN1Zd5j0ezLqkvTe
                        wLSvDxpLtrDXip8H1Rlds0OhbJmAGWfIXLLDv75rwY/NhD7H2TI0X3ts7t9cqSJdmQRn0tAHD884
                        wz6BV9hwNQcfnlUCZJySz6yYo/KObKbLOHngj27kwZQF95w1cyhz4w+/J0wKYBY5Mo4UyB/02PEc
                        Ou8RfLRuKaqbt+CcOXRI5VJUvEZKPSiStK+glO/XUV8pPmv6zDDOZRHMrN/kY2nlAdLRM1N2+Ne9
                        SGHB/dbPGe/tzxZFdZ8WnElXEvRlVr71gJ/nhwzOU/J/L+jBxH8LH1ZmXbvkqB4/qsNfBQ8zdj/i
                        chm7AUAbAmbYo4Slpw5c3GPm/WUfLDb+0EN//9cog9kLQJn3eOJcQRx3cN/8e2bdWWZRCdnYYidG
                        STpGoJoFpn5O40zEcwCzoTPK+PkVQWb0HDN6nskO/7oXKvy+6xUr3rPvpeiRSZOyoIIz6QIDvKh/
                        K3pw1AVAKzU088Bb/+ifryx3oPKfqyAoLD3Moo0fbGbt5lou48pKRK6tBy2amYN9Zri9AZiNALjc
                        0vcTbDhcmofI6sG//2PIrpo+smIDZZtxFX82H3/YdnSFH8f75piPmuO13CGY5euh3vHY1knwIUml
                        c4b7YvE5UVvbeZRLAI9Z2rjL4OgMzCKzD7z2ov5s2eHf1iJF1vox5HyUBGfShT34aut3hIrq+LPB
                        t+gatLD26uYIHkYLa5dl+Wr+0tpZswjIEP74by0Jznx10Ycke+YnsqS9BTDLZmB5xmxpW2vrqXX7
                        zHCLHBmVZTnMtRo5ovoswQ2UbeYJ/rv59+Zzz8331c3x+Wjt2XQ8UDrqU6itXAbVd63UOywU6ZyR
                        ooW/VXDPcnObMQFaNBvxkPfzXQZHrwcCWWbykZXlyw7/ss/z7HN9/YmLJP7h3ktJcCZdUKBnlq9I
                        ZqBTWzlrFv0OXtmsrJ2t8T6ZO/jaFB4e0Wt7SzZ+3f5aOevzxdqlk1nv2bWDGc/AwuGWXsqIlvkf
                        aIscGQVmhzl+eI1hj9mmfPGvBsr+/2b7o4Gzl+Y4W3OcXuG6iBrM+V7QN9OsFOzVPf8fuoKv8+h2
                        z/VsmLobFPl9mweqr44QmL5ncPTa4uqOFfyMJVA26oEy2eFfFoyVxsVEmdesL5z7w8+pxFcSnEnv
                        vFlENtxZidvEtuWBUVYLM1sMZrjVtnWV8z6ZWfP73pqA3/9WNL9jTq8z6mvD1SPPEtw3YPbV2tkD
                        L3Wc2vFLYU4JZmzYgqWMDGaecby37mBpgdlxjh+XoSKY/dFA2f8HcPajucY8Cz2DoDa6Xv188DLV
                        6Bj3QVo1IPDAIPE94zuGSOff5S8elu5XLwmcLSwvCTwURL5ncDRDWZQp476yyMRqKJTpetgNnPZ1
                        b6l7zpkM7BnMsFpic9/38UQ/ms37i1/oHn/OYyUkwZlUeADihY8PPrTi/gCBem3tniK0c8WM1pyA
                        6Y0enpPmZvIdzrNF87lZ88Dx18mDdTOAfAse0G797lmzr83n8XMfrFsKcG2BfRTosPnHm22ziWPY
                        RzNrO/lh0C7DiONdq3idYp/ZpoTRs2b/p/n4V/PAfoWFiJm1h1BzsLu59qKRCGirPxTSSgEHglnk
                        Hvfe8RYqkbweKMNFv2jEhzuQeo/rnBbmDhWUDoGyzKyKZ7FFhlURkGWui+Oea0bn//vhqXR/6SvH
                        7gOy9cCPdbAo9wpx05+27S/+btseY66AUXmj4Ey6wBsTGgtwNuvBtg58I3hgTq1t1rGy7uDbKPD3
                        DQdkjgjMcEZHTXDG7o8MZlHNNWbNPjd/y3tvsAzm2laYhg4pxqwZgxlarGMmhY0/5Mh4+GCVyxn9
                        GvU+My9n/LdtSxrdDMQNQKZ0vfAcwi8Wj0bw8QiYRYsGUmdwFvWrIphlwWe1w7mVZd5qnZMX+1xa
                        BferZzhfF3A+vlq572wf50GU0ejLkDGsRSNe+Hk4trLBx8h2LzGWhoN2tJDEH0v3pL6xCRHER+Ae
                        zbF8tW2P8b/hfv+ntd15Gc6kA+kUA6gFZ7fxAFzThe9B3/cmOMMslj8sZ/CwQDjzh6ZvzwGgza09
                        QHTd/M4XCAIncNPDh3TUaxb1tKHJh2d/vLTr3rqZNQtuutfywOHmYewve6UbeQ3BwSwBs2z2lQKC
                        w4nLGdkE5N+wuRHIg23NQHC+2Zu1+xZwLtoXALNPCaBNCc6jfjRLAhIMfNjYYFL4nX3OZKUsnM7N
                        y1uIqIOA9AWeKf7R7/e46FDqt/kZQOszZogGRq8K579ZbvSR9ZLJ5ONw51s0H7VO7jFDSrCz8wTH
                        JUT/jqDev873flyUc3dej7myGEe6Eh0dzjYU+tuvv2vPHy+Aj5zfsKfIAWzZXPQfAaBGAG0OZ98h
                        OHyElRzMctV0Y5rb1hBkAkG/0coRG41kpiXs0LhuPmI2LVqxv/ThuqVa9dJQcM4yDgEzBb/HCR5K
                        vWbo0PiHbctbeL6Zwxmb9GDmzHsYEMpwfh1nTrHMkc8Js9g2nOHMf3Zq7b7P7PdyZg7nAEU9OZiZ
                        1zl6Oec9PpM4u/sIi3847ymDs30Ep6X7ahZgc6DPQX5WvjixPFNWGkqsc/v9xzMyaikN/B5bbGlf
                        WT5HNItd3qztZB2BWrQw52NT8N6PC3JybDwSr9wMnElHv0lFmbMZwBeC2RfbrqT7QwTh7KW5aXia
                        3WugXwAE5s3vxBvUq8VW3tx7sApuYNEN1QA0atuajYwgCPReGoaOSwW0IS5nr9a2y+eMWQRm2HM0
                        oWBBQcHprlE3AvkLoOx78+B+DsDbj1V0TrxA4Osw5mMSPgTnQgRobAgTudTh9Ymls7OBvzsqV6zg
                        3GXIq+HvKIg9/4WIaPYig5nD2TOcV/dWzpzto6wxm+PJgTUbkURAFmXKhpT2ynnxMItfuBjAx7IO
                        FoCyUlNeYFgFi2GZiVnUlhGNj3iBxbkf1l4ML/WbSVcEZoKz2wn8sNkUbzoOZp7Z+gLB2hSCHixN
                        RPc4XM3hwcYeoLkL5CRYiaqD1a2+5mp/YGH2ja3gOfCcWT7j6RLBbEUPnMiV8b0ZMxl/nCaAWMI1
                        ipkubwT/AUEr2inzdZGdH/57+fjfw+cieJpad/B4dC5isFzRYsCM/saddWevjS3OFpTKcCP3O/Wg
                        na+i/pqXAMx8wc+fI5lT7z6C0yjLgsHym8X9PVmpbQRhWbCvodGHv7fy+TYP7p8G96sxLARxltMV
                        GdlgPz725COoRZVAuCDNvgC8WPEiMLsdCc6u++Zk1nWBQzBaAXRtbgJe5nRHcFZT4OgrOghnrwGc
                        +UOOVwmjm2hUF545EeHDzQM3B7PNe0DTA34/ff0t53ocI0dG7C2a0zFwMBsJzC5qAYWzCf6Q5mts
                        aXFZV2V5ZhXHSiA0zQjK8LyYWrtHpg/ODBZm/OfvCM64fDIynsHr3F8nXt8IglEjv3R+CxDrQhCK
                        ZfIe4PoxfUvgbF89N1mWhedKccl8KTsWZclk8nG88y3ruX+2rh09whkuSvF8T4+bonlk2Cv5nABa
                        dP6WAI1Bb2Gy0D+aNu1XKmuUjvFgXAarmA5snkb/CIETBuz+0PKbEbo9PsKKDq9GmfWXbZTmf/Dn
                        +Heg4+CHJmj7YlvjA7QLz8qnLgXM+soYGY6x5Etgdv7XZ6l3EB/uWUlXKSD23+3ANLduPxjCWGTe
                        kfWccYabM2dc1ohbVNpoFLhO6PqeW7e3lMvKdA6f3wIhuzNGfWYe1Pr57pDPszSXweLEz5Y2Rq9x
                        HgTx0ZDoqfX3kwnKTnP+cX8jQlRW9j9LFo/8WcyLaI/WznQ9W9csbWHdIerRSIZoZNGbdfvuBWZX
                        LsHZ7TwgEdC4zwWdFDHLxHb6+GB9oRWiqEnVHzorK7seRQ9zs/JgW7yZ3tvW4ICtwu8s7jm7lKAm
                        WtHFwN2DmTmB8Zj2j8DsMiCtz7Z73XN91MnvHRGkRSYFbLYRlWMNcWvE7AIDGgc+0wT+Kvh5Hy7/
                        zdqZ+SgAVlnj+Z3bawhqFxZnG16sm/k361YKcN/OOlnE+9lFEh7lgr93YnGmRc6Luz3fLHm+7/Oe
                        ymNKcGHAwbum48n9sdyfH40kwsVqhDPulWQzm+yev7Ru//1aYHZcnTJ7NjnFm5VOBmcGK0Xc58JN
                        +vhw4VXFhXVnkC0HBo/VwBt1Xfg5DNyw3Am3qN/sEtwHS8YfPFTYN8yYebbBHzQCs/MXl+VlBgO7
                        mNlEkIZZ8JF1Z5FF/TORkxwH3tlsJwa0aMus+jEzvrmWv9jWnRKDqbHFpUc6n89rwWHZA2a4uFTT
                        cysCtEM4NkYZ7DeAswnETLzwMClcL7cOZXXhGVfaJ4cAtciEA5+bq+Dc9dE/2AayOXe9Fxj7gh/p
                        nJ7D34oW2dZWnqsXLX4JzG5AypzdHqBFD00f8hnNH8LfsaIHLa7sRHbau66aDRGu+OMQ5Q8EZh+s
                        awRy7v1mEZhhLforBTevtPpXwTFUxuyy4Kwv0xS5nVYDrqcoM11BQMIg2PfvLOipLXavG1vbVp+B
                        amJ5lsGv8Y+2LUNyMIus+aN9o/P69PcxNk+Iqi5Wwf2d+6az0safLWvsG1GypMUNvl6zsRB2w1BW
                        F/avWT5nbF/7rUp+d1+2PQIlrzjiNpANjG1cq/8CQMP+4HmykLBO7p3RFmWGpSPqVNkzwdltPjCj
                        YaDRvJWoNyyz0D5Guj0qaUQzEJzZFIHIpQA0rzYjmHlQg03NawqA0YABXfgEZucHZQgiaNyCrqPe
                        O/kCD/wRBIpDHtrZ6nVmqFFZv9lGqQy5NO+JP0ZZBjT7cYfKtZV7Q65lnuG1gxnfvyLjImt+dmyx
                        ERJnIvb9fGTXUyNg5Kwzj5q4ZijbdUEog43SEOhoQah6x/01WvS6t3YGnh0bp8GzMnJ/xAwwlzVy
                        qwdn5Er3zwxmpRuS4Ow2H5wIAVldfJX8fOlGe+gbSHSzvSM4YxgZD3hf5wTNXMbIq82cMcNjOKH9
                        gXAmMDtPjQIww/7JL9Z2sfNS4p9pDK8L/4+Coehz9YCALcvMjax/xpPvl6ltTUDMuhlzvN45e6Fz
                        /HT3NF5gYmc7vn95+Spm0BZwbnBZfakXp9rD6+fFSLPcHbWycubnGqGr735SJ/txbbHL5qgAu7tA
                        WpXAs5f4o5nQ1Nr9jdgSMKHnpf/cm3X7bjMjJ8yaZXFS3bN/BWWCM+nGHp413HSyOStDVsqPsbIT
                        rcKj2UUJzCKL7nMEs6y/7IXADLMnaL6A/WUIZsqYna+iTLCX536xrZW+b3z8cdV3XwFZbeVsXLXj
                        9Z5l40pZuYrOa1zlRndWvu6xXxb/hsobj/tcqQtghufvGoLkj9bNsjqUoxnD0vZvCtK3OJn1BJXA
                        4NJArH7H10q9ZFGVDWYiM3fXsbUdY98Laf51jBXWdB/5YG13Y44v2BCtal47V6JgfJEZfJQWsAVg
                        kuBMGnyDLsHZKW4suBKGWQa2iM9W0c8ta5YNlo56MxjM/OHmM6AQUj9C0Mr7QmB23nDm4LE5hpus
                        2VdrWzR7Bg37Gap3ANOu94Wfvd7rQgCbBVsVwCf2UzKc8bD5c7/ur/1Zks0LewnuYdYcMwc0dscb
                        WTtTEfWd7ctafAigRQ579YUfq/odnys5LK8tXmzMSlIRonC+WDZqYyikVQD1E3h9uMDDM8PMuu0d
                        BgsNnsFd0MKQxx0Ta9vu82KFQEwSnEl7CcbO5UYSBbFZr1k0cPpc93fUX+arzA5kkaMZzzDzUQIf
                        Lc4kCMzOE8x4tZZn9vlweJ/bt8moPdBxXdowY5BzWgDKXi8HXBw0PQ+As8htVuf98Y51NFuKwWwB
                        QfOoOZ4e9N415zWeKyvrZuMQ0NYU/FY/cU1WSYBuls/1q/fwt08BZaX2hKEtDLXlFSCZ8yWOS+B+
                        w8jEarYDpLFTq//u6D67tHKpqtH5jAsEH2nz1/ts3bmN5xZPSYIzSdpLEGuWlzNmUDK283RnzAZL
                        cyCD5Wxul7+EoGZs26whG0dEJV4KUM/73K4tNgTBmX2cIfIgZXVli0Fcilg153/k0FoqaeZ+U5U3
                        HhbK+sqyHc68RAyPk9m2ZGwEIObzqSrrmoKg2cLPZLEyNz8ez5ANXr+kDFr2PqLZWzwqY4jTIGfL
                        EMg8448uhlhmyM/06Lk+BNJQIzrODmslMzN+P75QFBmLfICPUdXOPkrPJcGZJJ2luLGX4ewTrF5l
                        teDnCmbYSIxQxiYQS7hmPWP2Ad77R8vLOgVml3OOswvpveV9Vec+GmIf8MYB/wsALPebRuf/OZsB
                        XSOkra1dzsjZ/zcIdNFt0+Fr1vweryJAm/0sc7YPUxDuaeYB7Dzvk6GwvoBjw7O+eFzA0uKh9xHE
                        RRk1Hv+yICh7tfZgZqwCmdLz/HOyMLVruWNtXSdYP//WlpeqcraWjzdX8uBr4vszvhZJEpxJFy9e
                        0eSek4/Wn1U4l8AsA7M5BTEbKHuAgAad6tAqH1cXP1nedyMwO/9zvLQIwXbxUVbomoN9C66XZ2tn
                        GBnSojIoZY8PG/SvEzB7pnuZj23BTImXMq7g42vzczMAtEOYgnApXMkeP4Iz/tvnOAA9m5/p19Mc
                        gCkCNVwgyTJOXM6IpYyvtM3pmDKcfYFtCKSNLc6UR/fZEdxTop5CzPoxZKKxzdzaTox4/lQBmAnQ
                        JMGZdJWAhj1WPAcKDTDOLXiNHKzwhu8lPw5lOCsFwWwKAY0D2SeB2dWd61xWNbHuKn5fv8U1AoCX
                        wi0ocL+HawLvA1zePNLpddDjE8008/salmYbnNd43LB/8g0+7/c0XtTaV+astnjkQylzVprzeQkQ
                        vYTrKHICjiBtGUBpVPbIpadzgBr/iL/fgQl7p32EyFf4mEEaD6IfFSAtc5DE7OECzmHulcPsnw+i
                        9uf0ogDq0gXrFAOoBWfSpQWsnjnCsqbMMv4cShqzRml/aL1YO1v2A4IZ7s0QmF33OR4tSPB8sGyx
                        4RayZzVcO5xFx8xZZhAiU5zDBfylckYsaVxDAM2LbA5ntXV7CCfWNmTIShsjJ8Fq4Lll1t93hiVv
                        pcxZdcbHy59BfpweYUEQByjPCdCisscMzlYEOXP4OKdj5nCGFTE+SuSBPkaQdk+LMdMAql0ZQGav
                        k7OK+H9cVP1h7dl9gjTp8uBsQ6G//fq79ry0S9AalTbyVqr1PsXDsmSVz2D2o9ke4Cbvq8geYPpD
                        K3o4CcyuP/g1K8/JqW9kP/A19AhwxosWkTmOdLiAP6oG8MUmN/XwwJkHiY8hYOfRKH7sSo6N0Typ
                        vmxyZACROTairTpmXPZhSHLMawiPlUP05tnz19/bd3oGvQWA1gdnkSEIZ6Mw2+nPKTT6egRo/BxA
                        mm9Rv3XkUsz9gmhUgtmwbGNIw59j8y7fb1zyaIK0y9OpsmYngTNJegeYIWRFzlpV8P3RqugpwYxL
                        SSIw84zZkh5YWOrhdfgCs9uAkdJ8pVtala0pmOPSOVy88GvkBQDN+5nk2Lj/czQqlUMwe272v8+b
                        YuObGdy/lhRoo/vmytoZurcE0EbJwlzf0GQ8x/iZE93Po4HKl5A9Y4OdpwbM/iBAQ+OOJUEVwxn+
                        m0sGsXeLy0HN2nPOsMwSZzx+JjgrlTpGgMbv+9Xag9Gf6eNLAGd4zjGk4e/BWaTKngnMBGfSTQUF
                        kWtWZo177NcXPcjfKHB5ACjLwOwuADN8EGHgIjC7zqB3VTjP6xvbL2blEjoc1o3lWb6IsTZlzw5x
                        rvo9zgPVJzoer3SuYok6lqLhMGoGNHTXY5MGzsiMrO3Sl73u0vVWJzAXAdp7SirP5d6CGbTNc8gz
                        aI+27ROMxhZklvoIaNEzOjJv8YVWLB3EfjiGtC/NsxMNQ3zB8qN1R+ognGUja55pQzjzn8GFAM4M
                        zoPzcXWD92lJcCbdwIO/snIWiuvA8UHiq2Y8XPJYr30dBC3PBGacMVsBmN3btvb+q7UHEQvMrhc+
                        8PxZJ4HgLWfPMvMJNjbAgcccJNW6Vg4S5HO5NpY0OpA5NI0B0PzfCGcz65apeU/aMrn3+yw8s9gQ
                        KhvCnM3owuxOdm2ew4LgUFWF5xSWpD5Zt7yx5NRYGm69Dv4dOVs6oGXuiOxm/NnaWfJPAaDN4Lyq
                        g2cxjqzBmaJ4/8C4giE1yw7i+aPM2YVq036lskZJ6g/G2P43qvf2m3JkAnCMIbTZMFZcmdwA2Xdr
                        95ix+QeDmcOZwOx2gt4sc3brzeZZMM2LNVF/i4Kkwy1CIZxhv9lzcwym1i5jixwRPSaZApghoL0F
                        cIblaVPbZs0yt14cz8DZHn7OcMmi9cDdJZQ1ZoYnaDHPJaq4yMHljNazb7L9ZQGc+bk0tq7j46t1
                        nY0/AZgxnHk5s/crrgHOXqw7TxTBDDNmnC1bJWC+Cj7WpgHUkuBMuvIggGGHXQ7RuTBrCD40mEUB
                        C4LZBsq48drBDGf/fG6A7Jtta+t5yLbA7LrO7yjozQKAWwWNbHxAZpFdKsHS9bIfSF7RollUKuYB
                        6sraA3xHBGqVtUsdsazRg2wPkHmW2j3EM145kdmpR1AWOeouCShxVlbVcw2f67WDzseepcT9jPva
                        ggWQIXAWPRP7vo97+yqLbfl5UfbB2vM+o9JGv09wdpDPU4SyqJxzFZwzpfOpvpBzQ0p0yuzZ5BRv
                        VpJ2DAI4E+U31x+2dWXLmoFHwcO0OsBrtODhjqWMDmZ/Na8bSxlxCKeDWZQxuxOY3RSolVabbxXM
                        opV/3qI5cNJh781RGZoHvGZtQ4+6cFy9xBGhAe97S3oO+P3V+9I8s8bnQTTvKiq9Q0MLhDN/bWax
                        VXt1IdcQ7mN3y0QXYBx9gKCC+46zQkMcCesB5xJCWWWx9T2fZ9Egeh4vM7JuWeNLAGXRjLeoT650
                        T65NDo3SJcKZJL0jUEUTgLm1V/3YdtlX/6Ls2SFnn5Wa439YN2uGYOY9Zpgx+yYwk4IFhSrZbgHM
                        EMhw1T+6B5zbzMNrvDfjfZlNj7A8zDNimdEGnt8RnKGjowEM+iLdvbVNQxa2LXGMAC1yQS31S42s
                        nU2aWruCYXwB51c0jgYNp7jPKjIB4f1itv8MUZ2cY5FF/7x5H89wrkSW+pEhyLwHykpZd+tZKBOQ
                        XZFOlT0TnEmXEgh4EDCybflM1DzON2aefbZvM4CoB+YNXuMjwJn3mr3YtpRxbHEpo8BMEMZ9IWig
                        MC4Ente2L/x9RjOy2D7/c3DdTKx/kLf0/kWzyEERe/9G1h0WHbnY9ZXceaDNZY0IZx6ET4N7f2SL
                        nwXfNcAiDy+fWNfmf3TGiwBY1j+ia+ij5TPIorECrqUdtrR6CKQt4L28EjTjiBm20kcr/AzKhpYn
                        CsQkwZl004HAurnJelYqe4jzaus0CWb33XcSmYB4TTyagDw1DwN8yJfMPwRmtyeEMgeyGW24+IDB
                        xLUEDKVyt5lt55ptrpV/wPaLbfs00RRAGbT9g1nmcshDh0fWHWIcGW2UShv9nMcSNSxPi6zT19bO
                        bPH9P8r+4IIAv1/MPM0IGscXAP94PU0tHqi9tq7FfQS4FT37TgVpDv4Tul/yNV/DebMKgCzr51Xf
                        mCQ4k6QBgLaCB370EI9KnKLgrAoeXD/z+nj+ElpK4ywzn/njwQYGmWyXLzC7DeFiQVR+5Ocz91S8
                        We5EWF/4/sjKGO/hmvFM8wbK/uvv7V9/b/9sAG1zLX0MriFlzvZ/b47KBHFIM8JZ5nqHCxN+vDFD
                        isfRrN3X+2Jxz3GdnFNc3jhKILGybjnxiBZMovPr3O8xuI/vLc5k8sJIBGn+fQ43h7zvZJDmr3Fl
                        sQPliH4uclYsjQaQJMGZJPXcnNE5C93BuP8kMwgZWdy7YxZn0qoBrymz9WbLXrQk9ocHZgB8kyvj
                        7QKaJWDm54iX73kTezTDa3XhgBZly7Iyxl+a7Z8NnP1XD5xVdlkGDtcCa7W1M2o8M6qmxQnOknL2
                        rLJuKaXP4sJnxBh+1ziBi6g0bxQA2ig4LyfW7W0813Mrgs+JlWeOjWj/lco3j5W5j1we18mxwi0q
                        xa2D1y0gkwRnkvTOm7O7Ob1ZN3vGGQaGM7NteUyVBGzvyaoNnbuEpTb8mrNsn8DsdgCNM8L3DWRs
                        YOObtQfDRsOVs36eSwUzD8zdKtv3A4LZZsOyRjfT4VlHI51iBztmUWCM5+QqADQsKUNA476o+2Ch
                        DZ308DrgxY3oXtqX4aoCQBsF0FJyCD3lvboeeJ8Zeg1GcJb9zWOVVnO56Qpe+yo5FtnstUtdyJIE
                        Z5J0NmBmFpc3ctkTDqLEZnLsRchW2TjD1tefVieQFpVNmHVLY7CJmR3AtNJ/e4Eu9rX4eAUejros
                        nGO1XZ5BSBUE5jO4lr0n8xdr95j9E0DNoeyztWcelmzVpd2PU53cM8dBQF9Ztx+Xh/tiaWMEVwho
                        PIerDsAOoS4z7cjOAzahKWXQRhZn2c4BzIZAh2cXI9DuA9BovlfkaHhsGI0Mvyrrn8UmSYIzSdoz
                        oPHsM85EcSM5PuCjLVpl3dVApEp+bwW/fxz8zXN60EunCX7HAZyhu1jUvxMNSr1UMOP3HpUwerbM
                        oQyHtXPGXGYghztuXH6Ki00ORZg9y5zy1sGi2cTicQmz5mfXybWDC3V3BUDvq5SoerZSmfypno1R
                        ZqgO3hd+HAfX4cjiUkZc4ERjjpKZxqkgrRKMSYIzSTr+Qwit6ycNnEUrrTwfB0td2KacNxsAaJmz
                        HAcsHkhjaciQFUcFlbcT7FYUZKLdNW4e3M7pI5otVBcIaGMIrNGN0aHsX9buLftmWwt9Hj7LVuq6
                        lvZ/nkbGTPfWrlrAfsglna/ce8YLFFOLS7/RCZLPH+5XK2VPS9kzBi+zchn8OYBZNsPNLC8/rQJA
                        qyzv0esrUT2X+45ATBKcSdIJbrxYLjMHQENLfS9nXDcP9I/WLnVhiPKfq+kaGbLyHgUV6DbmmY6R
                        dS2BSxmPfdv+S+d3Lpt1LazRFMRNZry08bnZnuDfXvIYleVeCpBy1uxbA2IbKPsfAGf/ADD7ZGV3
                        VoHZ4Y4d94d5Gapvczr/ojlTbONe6jvz4+yut1H2ih0fcRhxX4ar1G88BOhODWb4POF5ZVyuyGWZ
                        EZDyXDiE61drD3J2WL60hSFJSnWKAdSCM+kaAlosb3yFgNY3B6FFE8ByyROu+HpgsaIHCz7Ya8tX
                        VnGI6ozAzANsDMR53gpbTI/g7wnQrvP8ZTjjLGoU/KIbadRXc2nnSWQCgnCGVvmRXf49LMREg4cF
                        ZoeDarzfuXmNl6K+NPc3s23FQG1x7xnDGZcocvbs1doufWbdEj52GxzZcLOnPsOQc1zYYUOqhbVt
                        7iuCVo//xnCvKUHZAhaGHptFkUfLxwkI0CTpUuBsQ6G//fq79ry0z4eTl1IgoGHT+LIJFB6ah/vM
                        utkyDyrcUdGs2zfGgFSaC8Mljdwgn60g8ypyVkd/rsGCtFtAFW2RoUxtcbN+yZTg0soaOVvo16Qb
                        gbDxxye4niPTB10bx4NqPGY+7mHe3M+s+feI7n/cd7Yi4OIqBFyQ8EoEXLyKysN54WzIOVEd8R6w
                        j9/DYIZlo+7q6llGfyZF95Qsi72EBaGPtDg0M/V1SleqU2XNTgJnknSgIBfdG/FB7OWMz9Z2cMMh
                        px4Ezm1bksGuY0OajS0ICqJ6/RUELHN6kDqgTeB19PU5KKt2uVC2trjBngMtHsng50k2QPWSAvzM
                        qRGz2TgHELNlbPohMDvOMWOg9uP1Cc7VBdzrXprz1GMONgeJZvZx7yWOSXmGn6no3hr1WvH5dir4
                        qg/wN9bWLTl8sa3Dq0Os93N+sNwkxApgy/3YmZPjpS0MSdJZgZngTLqWgJfdwCp6YG8eVt6LNoOA
                        zktxvHzKS28wGOAsVpUE2OyY58FzZOKwgIcb1+3PrV2OuUoefFn/hALSyzhf0eUMzxk+d95sW0r0
                        ANsTBF/Yt3NKS+v3BvlRIDi23KQnc5HTdXD848eZM7znLWGxawr35jHdr9lUgl1sI0v9e7ifVgQp
                        q2TB4lBgVvcsxFjPv3/m7+G9xPtSvRfV+1Hfmu+bwDHC3j4cH4C/M3KCXSULQgIxSRKcSVLnYbUO
                        gjLvb/AHFtbaY2/LKwQF7hKHq7lsD1xZXE6Cpg0v1jZtwA0zY3fN9/hK5x0EL0vrlq1ldv9myqJd
                        0iJCCeDx33M4lzb9Hd//3v74e/vL/jM2wiEtMla4BoCNsokcNKIJga6D48JZNJePz0P/uveJTWjx
                        CXtu+dyNenjRCRJ7c9eWj5WwPZ8TdQHESoOO92E1H8HZEu4Vj7SIMwc4855qhtXa2tUmCHsvcA/y
                        BSHO4l96Bl+SWtq0X6msUZL286Bcw4PHrF3qgavu2MfwCQKGj83DB0ty1oWHLM9ae20ehg9N4Py9
                        CaK/N9uP5gG3gmtv1vzdpybw8M9jdg0hbEgWQTrP8zPrDXmlj7g56D81QZefV382m59TnkFbXVCQ
                        FGWi+ZpCOPVrBIfK8/k+tq6ZjnQYMIucFTFIXxNgPdk2ezahezSW6k5oQQr7nzBz9mpt8ya8tkr3
                        7uonr+MMwLL+0aiEeV+Q5r8Ps2Y/4D7xaFtny1nzPQxna9tWaxjdn17hd36H3/0I951omLgkSYIz
                        SWrN0onmoPFMMy/DcUDi8rC1lVdE2dTDA8gHCJ7/DdsfzUPtFR6GNbwOBjMelM3ze3DDgCn6t3Qe
                        5yefk5xd9X/76rSDGcLJA8D/D9uujnOQVF/YfuH5SZgFwF7RMV2D0Yo9us8J0A4LaGb5zEZ2XpxZ
                        u0phXIAqHEiNfWdY2nhned/ZPgeylzJiUc/o0O1nF1C4nB9ByhcFH2zbS437H0v/F9YupY+uQf+d
                        /26ebf67hyxmStJF6pTZs8kp3qwkHRjQ1vTQx6ySQ44/oO4goMWgg1fl6+D34sr+E4HZHwRmfzUP
                        Oa//9+GsDooIZj5Me2xtZz42SfhgXWeyvoHZ0mkhBOfyYeDDK9IIaS9wjnl5I8McB0iXJjY18H0z
                        tXYZnH9PNH4iCgYFaMeBNBxknH1talt7/dq6vbUIaBNrZ+Z4IDUPo66S34PXw3vOg6haIppRucu2
                        L0Arwdl3gjPMnOF7WDTPkal1nTTRNt/h7A8AtB+0MLQSlEnShcKZJJ0A0BBasA+CZ0mxQyM3SPuD
                        h2e+PFm73OwPgDLsD3q2rbX0HbwOnMXmpVtT6zbFs+X/iqBMYHYZAOLZVs+0eomir3Y7fGEG7ZVg
                        DU1kuPfj0lauI3Ad0zXI5aCRBXtk/qBr4fBghv1K2fdg79gcFscwE8oQw6WNUfZsTsd4bfHMyJ+B
                        n8z4CRcIFsm/eRGBofG912od3FPmcE/BxR5fELyDfe+v5aWBMy8Txl4zL9N/hIXHv6ydlbvkrL0k
                        9epU2TPBmXTNgGbWNvBgeMEVWc9KoZsjfv8KPmarin8CkDGYPVFQgvPUHPhebTu3CfvIsNn+s23t
                        kY2gctwTJEmnB5A1nUNu8uFZVjb68HJbtNKfA+BlgWh9YdcqZsWiIbjch8ZwVprZhJBwiHvMUIi5
                        RUCLxiT4Ob2mxakou4SljVnf2dq6VQ2rnuuiGni91sHvZPddPB95uPYiAbaVdd1VfwbOMBvvQOVZ
                        eB8E7mCMi4ufm/3okMwVIc8EaJFj7JvFpiCSJAnOJKk3eOL5OfiwxwGnaDhQ08OUwex7AmZel4+B
                        tgNZRQ8ztPt3OGQTEDcv+QZg5mCJLpRjU7bg3AGEy5B8VdrPne9wzjCILYIA7xqc0jy4XtJ+WwdB
                        MUOZWTv7Hc1fOsSiTx+k3ZJ7ZF8GjQ2NHBKwR5ABDRebSqWNS4D6yAZ+V2DInFUX1jbq4S2aRxiB
                        GsPZ+p3Az4safk/BXtZX2DdTWuzZfP0jLAZyv5nfn7Ck+snaJddZ1l6SJMGZJA0OILJVWB9uemdt
                        5yqEKJ45hXX4CGdc9oGrix7AcHmMZ1Hc9ABLFd005LO1Z9agtTSuEit7dt6gtrKuVTWXDvF5w/bx
                        Ud/KewO8c9gnHFhjkMyGEdhHhJll3HyxYm0/P9+qZAiRBaO3OIswA7TKuoOrxxDUo2tg5LboX8cq
                        B8yeLejvR2MXolmVuyykvBH44BwxHIUyB2hhQFseEM7WAIDo/OoOrtbsO/+c33O8hB73XQlC5wRl
                        C/v58lFJkgRn0o0rsmb2rJmXNeIqIjZOYw0+lzJ635A3Yj/CQxtdID2IWFk3i4KliVgO5CWNOK9m
                        8/9PDbBlblnXHAheKpgNtYzHbOsygLFrgLIoKDYAtOi9VdYeFO/mOJ9sO59wX/PeMhhjU4g6eY24
                        3YpZT18GrbLuwPFVAESYPRvTQpWXoPs2p+OwSkBo6MIV/x6HGXRL5fI+zFTNLS9vXMH1/DNljRFI
                        RnMTcRD4GKDL4WwGi4HsmPqWbDyXTmAmSYIzSXp30MC9D9Fq+whgzJWBmcMZN0k/WrvsY0kP4sra
                        JY2+Ujm27mq7v1YPQBzMvlh7vlW2QqwSx/M6B6PAKgqIsDQqMg+4Fijrg1g3hvC5fzgbLjJE4V6e
                        fUFZNBB7lVxzuACEJZbY92pXvHjCfb2+L6fBPuQ5YBj4TwCouOKBTUH8GjK6nnbpOyuVHz/Rfd83
                        N93gHtE3y0sZ91mKzL1nXJGxpmOBWUDsrTbL3VBLpdQqZZQkwZkk7Q3QuEcFZ7y8wfevAjDDOTII
                        ZQ/WtjaPGqUxeKkh+FhYXArlmTP/vnvLV2q5tFGAdr7nYJUACZsPROfPtUJZtI8461QV9uE+oDCD
                        slUQ9EdukZyZx55QzgLZDUCaFe65Y2sbvziIM7iZxSXpnjmb2bbcm3uwFsHiWOl+GGW25wBnOL8S
                        5309JYsFQ8qR95ndzWapVbTIMQ/OxbpnAYI3E5hJkuBMkg4R9HGt/SsEAW4A4uYf3mf23bqzqZ6s
                        ncla9ATW2GPDwSZ+HMP3zKw9lNj/jUHBlIKeW+l3uZQglRcIuPTNEkC49iAoWzjBMjbsDcVSZO8T
                        jcqC9wFlS1i0WVi7bI0z41h6dx+8Rr8+ObN0jaBWF7YIKCrLhzWbdaseuLTRyyMZzhYAGZMB11HJ
                        uMcHMf8f2/YX+6JclsUtDZ/eZwa8tK8Nrosl3Xei956V7grKJElwJkl7D5D5QYYuV0/N116aj/j5
                        B4Az7DVA96q5tVdM+1ZH6wSg8HNruFa9HIUduTav4WMTpHCZCjqeKYt2HufhKICQzP7d9hi8XQKY
                        4axBnGuFPZbfYPvafO6jtZ1WxwMBjUvZIkMJHGXAM+ew39OvNwezj7A5TK6snUWrrT8TeEnXaymT
                        Exl1YO/tyPL+pawsHcef4H03Ksnz3z2ycmlj1HPGpY1/Apx5f3E0ey/qEY2ArN7jvrfgb1TBQmDV
                        8/4jkL72e5EkCc4k6chBQ2bG4KuiVfMQ9mzVm3XnvDxa27DBgzVuwObSj75gOwtGzLo9SQ5m/po+
                        WXtwNQabU2uXrwjQTnPeZYFmtN0arFbWntc3s7ZZjwPOl2bbQNkvf2//+Hv7Z/P/L7BAMbP+DFoG
                        EWzbPw8WQ3DzTLnD2QRg8nPzuj7bdnC8Z9I40xfB+SXBGgfuDGW4PyNzibrn/eI1g/COPcN4HPBv
                        4r15asNdG7kfFO3lce6X9xj73+lzUj1UeXI94GtV8rEP7gRl0k3qFAOoBWfSrQbLOLTzuXmwV83D
                        3f/NQz0z2+R9DAKuez7P/Q9ovf6XtTNmCJ/3tm3E91lCArTjB6ylQKm03QqYcTbEocwdGL/A9hXg
                        zDfPoOEiBQ6Rz4LPyKofM2Wv1s5O43Bf/79nz1bwTL2D1/3UvL5XAMgPAaCNrVvieimwVgJdhCTO
                        QL4BzOB7GRX2Bc5Lm8I54/vSQY+HRWOmbmK7gUYdQCa+F9+yeV+Hzjjt+l6qgT8jGJOkE+nocLah
                        0N9+/V17Xjo1mGGpStU8WJ/gwb207qo5OsRxs/m+BwEjPOEKrgPlYwNmPDAbS4fwdc3gd+9zMO8p
                        4ObcglMbCAClXo5bU1TKOLN2+eJXgLHo41eANixtxGxxqWxrbe0SuDdrzzJ8BhiL7NMzOLtv3sPX
                        YFEnAjQHiwnsjxKoVQPO++qI53oEulEGEl1IGcy4pJUzihacL5g5QyBf0n0+qmoolTaa5f3JVQCi
                        kXlGdC+4tPuqJN20TpU1OwmcSdKJwQwf2i/WdmREK33uNZkPhLJ9P/x4yKi/7gcIYsy6K7vsUsYa
                        nTnY2ID9eU6ZhHpAwMrHJsu43hqkebB914DLBrS8bBE/ep8Zlgp+Aii7g8UKBrN1cD1xyRpmyh3K
                        0PjHe04jAyDsDfXM2SPBmWfgPhOgMWCwBX8pk8Tn+zGuib4SRuz3egvADEHJCLamBKyRYU6WPcPj
                        vrbueIohpY3RKBN+fRPLM7PqzZIkgZngTJJ2DCa88fwNHuILeOD693FZzML6yxfrA79uz5xxVqAU
                        iHDAz8HHOZQ3ZmBjyf6N3A/tRO8pClQjcwl3/vRMLLtsoqPcOnn/1whmWNLovVreV7aBsn/Zf/rK
                        /mHt8sUIytBoo0ogmcvtuISRocyHyrMREJoALQnOZvQ9WBb5laDyA72HWQABpdJHS64BC67zfUBa
                        ZKCSQRnP7ONxH5V1s2DZseT3xT2KuM+WwT2RF6xwfEoEuPg30JjmPlgIiPobBWaSJAnOJGlgYOEP
                        bYSeBQUBfc5ih4ay7HX7a32Br2GWDwMhzppF86LM2vPQTglltcX28VnpH76PLKNgB3xfJShbBecP
                        9zBi71I0sPzas2iRycPUti6HbPzhcPalAZsPFMhjkGzJ+cQAwWXLXr74nbYIzLC8eQnHyt/Hq7Wd
                        HfFvYNYPxwKg7f4sgbVxAgPRfMSoJO+913qfC2MflKFZRm3t7NcsgB7OnPH75MwZjinAEm98LYsd
                        rq/IFRLNaXBhYCpAk6Tr0qb9SmWNknRcEMB5OKsgAOBV9j73rWO87jW8bqP3sqSgaBGA2TgI7PoA
                        5hhgEwXQ0Ufc76VB4mMKSg8BnkOyB7xqj2Vzj9YdYP5sbVv2a+5HiwJtDLbZqfGTxdkyNv7AOUwI
                        zFmpHWa1omwZglkE0pydxkzQMgFBBLRP1rbaR0iLYA3fL88yzK6LqCRyl2tiyAy4BYHZ3PJsGd6P
                        ZgRmnJGKRiLUwTkzCfaP0b5HWPRzh0sbo/2I8Jidi1xSWZnATJIkwZkkDdba2uWAa+tmW7Iszql6
                        CfzvrehzPM8n6jPDAGZSgLNjwFpfoMdwgxnLlbVnQmHJUVQCZgcAtKGudHOLZ2NhcI7zkryP6QWC
                        2TWBxrWrb0D3OAh+eShutrjCUMbZMgazHwDNUbaM3f94ltQ6OE9wEQVB/aN156H59tZ89NeP5X4R
                        sGSz4sbwrB96TZSu1bXFJYxzAjNeaEB4xSHSJQitknsV3wPw+h/Ba/bXxyXEU/reaNFgTHCGZjXR
                        QoGfo7d03UrS1eqU2bPJKd6sJJ1IaCO8tu5gTrP+/qdTvnaDYLBOoAbLdRBeZkFw578jK5GKwO09
                        oJaVAK4CsOHSqBJwTinIw+DO/97I9lO6WRcC7mgmloPYC22eqfHyOQe0KHt27U6OffuUoWpOATX2
                        Do0SMMNjM4fj8GTd4fJo/IGOjC8W9wbWVh5mzCMwSq+T3f7WhUUMzhQiDPCsOL8mLAC0n4EyztZn
                        2bK+azbqtysNZq8DQGOzDv+5ZfMxgsYl7csse8b9kB+tm/HELO7CVNooSdKlwZkknUlAaD2BVen/
                        p37t6yBo4iBtRFCG5UIVBbfcdM+9Klk/Vx+oRaAbubpFWSachfRmbROBEQRM9xAk+Uq2z3eb0P7Y
                        R79NZL+ezcSK5uM9E6A9ABA4nC0p+K+v8BqsEojBksNH25aNjWFx4s3apW+jAhQt6LzimWUPFtvk
                        P1vbtGUZHBcEHczwYdaKy/PM8h443DzQn9q2J3ZEC0zRoozDhGd6VnRfmFicJd8lq525MHK2zACg
                        +F4ULahMC/cjS+BpZN0MOi4++b7D7LUD4dJyY5BS9gx7z+4JKi9lTIkkSQN0quyZ4EwSpHWDxUt4
                        3XWyYbP8zNoOYx7kuhulr/hyTwqXkvVZee8Kk1m2iQGGMxZsuuDzpHzg7+b7PsPfuaPX8x5Ai+zC
                        oz6iKNh/JEDjDBpvXNZ47VmzaLzFa7PfsI+nhv391ATHHBAbHafIIv+FoPmRNoayzPWUFy6w7zEy
                        qWAgKbkzZjPODBYnauuaALnZxsi28+I+27YUOjLP2QXKoqw2/u1oP+H+uOuBstJsM0sWhCIYngKA
                        +vuYN59/afaL31Oi8sm68DfQGOQD3Vcj10ZlzSRJEpxJ0p5g7ZJe6zoAEJwbdUcBhJf7zK3bK8GB
                        5hiCDgw+2HQjCqI428SBHkMZOxhyn8/S2vbbdxCAfiGwWRWO51BAy0ruOLuDGTDsV/JsGJbGvcD7
                        xo+lPp1rv+bQMdUHrCNweabMM2kll7yoNBLPsxc4r6LM5utAKOPrYxJA2SzY7izOHN3TIgrb63NG
                        aG3tgfT+2pcAZx9t6yI5Cq5hPv9LpcZvhW2Z7KdxAqZ31h6+zdmyIWBmlvfYcTbV4RSdMz9YbOTB
                        f5OdIblcFAG7tG8lSZIEZ5J0Y0CJgPYWwBlmyHwl+YkC3LF1zUOmFg+GZSe4KoGzKFvGTnkOZFje
                        x1mMtwTOfGDxN2tb0XO/ThTYWSEAzMowI9e9zet118U/revyx5A5t+7spWiG3rWWNFoABWiWgaDF
                        YPaJAus+OHOAeKWFAM5islkEw0Y2jDgDsbsB/86+zpkldqXEc2IF1/JT8/qt+bm5bcsc2Zafz6va
                        uqWLkcnHnM5bNvvgLNPM2mYfWQljdB8ZAjhDShv9+h01x/oePjKc1dbOwprFZivZPXGXqgJJkiTB
                        mSTdAKBV1i4Pe6JAyMvDnhqw4QZ8HgibrRL3zVzKDB5wCHNkxsAOeTz/q7Zu5uyLdY00osxTbd0s
                        YWmfRmA5h/3Khh6+oT3+o3VnYjGI9RlBXPt5a9aePYiwgNm0B+tmlHi2mVnu0MiumQhkJeMZHnR8
                        N2C7D64bBJMZgV0Ee1OL7eFXABFY3uiguWp+bkXXyQeC/xHt66iHkjeGVwTXKLN033PvyAZqD4Ey
                        s25fWFTaiKNTni0edG0Aspkj6Jr+5sjykm9JkiTBmSQJ0DqBKZaIeQCybAK4T9btlSgFWF5qhQEX
                        u6NFc+IcOjCDwXOlMNP0owA1aAiCDfrP1j/AGWEHQTVb4Y56odCk4gGg7I9mczjz9/JIrw2hjOe3
                        MZDdQsaMz1sLzh2Es5KrHwfTmAV6s66BxVtwTFYJcOB18CHYuAyxNEwa4WRqsd19tPn1tYZFijd4
                        7yu4vvy9WvP3Pll7ADP2TlbJOR5lGNmoZkSvnR0YcR9MrWvg8t5sWQRqI4tdG/G+50DK5ZS4OJCN
                        KeDxHlHJceZ0q74zSZIEZ5J045DmgcaoCdZGEIS92dZQ4Y6CJYazvoD03uKeEaMAuZQxi3q0IjDD
                        oBDd3+4stjjPbMh9i8qQMjBbwGvH+WQOZf8GOPur+fpTAGal7FhUZnaLCwtm3T40hPqoTynLdEQO
                        gwuLZ+hxZmQCwOGzrXy+1WdrDyH+mADajMCE5/GNaWGEB6lzyZ/BPkGTC3Qb5K9jKeIyWBAwAjs2
                        tvHzGA1HjOCSs3P3AUhP6L3u0lvWB2Z95YZ+71tY2+11BOfdAu5nkUHICsC1tE9v7dqVJElwJknS
                        gCAXy5TmQYDxZN1yKQwIp9a2qWfr6I8UiHKPB7+GhXV7zLicMRv2y6v97EbJ5WgZ9HCgPrM448eA
                        i6/90bZljAhl/w7AjMsxS1B2i0BWArRscHMGMlUAZ5njIMIYny9GgTu6gX61//Q1+vbF2oOIMyiZ
                        JlDG4FUqkcOSTZ/LtbbYjCK69pbBObi2uCzykRZLfKEEwWbafLyztmX/J7ov8L0h68n6GTAz6zpm
                        Tmm/oNvnkuAUexqxjxH3fw0LWy+Wl1xH55NATZIkwZkkSS24MAh6l00wwSvZ0YwmdFnL4OyDdXt/
                        qgQQIwMQh7RHCALZwjzrHxslQWcdBOhR/1FplZxfu2f7fhCYccaMg7YSNArIyosLOBzdgWRhw0Y6
                        lDKmWRmpWXewMcLZBsj+2Wz/+Hv7pQE0hzO0VI+yZJMEyPrmCXJ5nIPa0vJyyVEApxGMctkuLkB4
                        ee5Dcy77MZjBe/D940OZ2awF3/e+ShgzSMMFG85UIpytrF3m6v2jnwAqJ9Z1cPSMpI95+Avg9cVu
                        a3C8JEmCM0mS3hHgIpDVFIRFDmlsEY5BDvac8Ya9ZxGcIRBlQ5p52C/3ZkX9HWsrlwdyaRuaeXgQ
                        ObNuj4n/LJYzuhmFB62YNfuLwKyU8dNq+m7nL87tWwfQkgX6fXMAs56+CsAfy2Y/NiC2AbL/arYN
                        oG2yaZ+t6x7J2aJs/ETpvfS9L8xusxOiD2zn/s/sGmEDITS6ebRt/xrCH5Z7eqnnxwDMEETtAGDG
                        cDYOAG0CgPXSvOdnWCjijF9Upo2jC57gXvADrnse46HrXJKuQKcYQC04k6TrDXCjErGFxVkHdiCL
                        MmjY6J+VLkWZs8jOHC3M2ckw6xvjgCwLtqOsGWbuPNvRNyfLswkesKIro4OZl2Si5T+al6wVqO0F
                        0qLAvhTo1wVYi76nSgJ9X5xwQPvWgNk/Cc64vHAokFnwHobMDeQZYvcEiFgOyZmyqOwTAQ37zp6a
                        ryGs4D7B3rtoMPihsmXRvopMQXDxxcu6fcTAhBaf/H42Se5nUYbxL7j+b2V4vCRJ1whnGwr97dff
                        tecl6TjBLZZylbIOEaBhD1o0m2kaAI5ZPLQ5mpuEM5PYSa7kWlhb7oQWASnOJWM4mwRw5pkzhDMP
                        xtwqP3JkvMU5Zcc6j7PPVQN/znY4FngdoEHOB4AS7zsrZYtK15r1AEuVAGpFEMIW/vPme8d0Tpec
                        QdndEq9PvG9MaT9gv53fGxjMDgFlpeOVAZqXNnoPHUNuNH+N72dsDuS9suxmKUCTpCvQqbJmJ4Ez
                        SZKOGthyYBcFSwxoUbCDDm3ZQOrMSn9hbcc8BLL3zvjCQbwZnOFqt5cnekBZgjN2sHOjBDYvebHc
                        uU3B2eFBjc/vQ+zzUtkcLlRwD+eQDF+1w2twZZltzP7wmIg6ALNsUSPKRvNogWhcQDTa4BhgVjpG
                        bKnv2TMHNAMA5/5A7kVl91a/N/i9xReatDAjSQIzwZkkSYMD2npA8BeVOi6s65SXueZxMMiDliMg
                        e29fVgRopcwZr/RHZY3Yc4ZDp7lPbkh/mXR6eHvP7+GSv6XFWRFexIhK+XYFsaEgwnPYEJRWdC2t
                        LS4XRvDKtrV15yD2LdBUdvxhzCWA9tfo17bDlffkjiwuR82MgrAaAGfnKWsmSZLgTJKkvQSvNYEV
                        BoFe1rS0suV31COTOeZFJVbvDbAR0CKzAyxFuiMww1Vyl7++BQEa9slxtoz/tnSZ10d07syt3S/J
                        Q8Xx2O/LJr60gMIllzj2wrNZ/rqqZJFkDQDCFvQIed4/OcT6/5RQFoEyzzzDeXBLuI5Xwc9jzx73
                        t64CaF8U4FeSpAvUpv1KZY2SJJ0jvGWgVjI3yALeUtlUvafXvg7AEEsUI0e9EcEZBue8Sv5m+VDp
                        fbwP6bTnPmdccZQCjoBwhz8uaVzb4cv5or4zzp75wsKIgALPWQQS7CXDza+BiXVLlksQUp3oOOJ+
                        4ewZmoOgwQcO17bCfS1ygl1buQJAkiRJcCZJ0sFgbVfXvLrn475hps+lctIAGkJZVL5kFg8wjsrb
                        FIxd3znPWTPsOeSB0zOLe5SwTPYQoMIZIjQEuWugA01zVhaXZvLvcHt8L9v1DBNbyuOWjbs4BZjx
                        zLNsFhzPL2NgzQAzG0dQGtEgSdKF6pTZs8kp3qwkSRcNatHnqgE/s28gswIQRpb6pQHAlvwsD/Pd
                        1bhEujw4w17FTVD/YPkYiWhuoNlhSvwy6/gZvT4v18NSvMiIB8sj2Y3SR0Pg+c6ZZAS0yETkFIBW
                        GgXCxi1GizA24PXXyb3GdC+QJGlfGh/7D375/FV7XZKuM7A9R2BZW9fkATNi7CTJ/8ZsAzf8Kxi7
                        PkUDoUcU+OM2sa4hyKHne2WLDzyWwqzdm8YZJHytDKYMXl4yyPb9fbPNjnXMcN/wWAAvTfWNh95n
                        brFDMmW6D0jSFWvDLA9PD0f/uyprlCTpmmHRB9DuMsTYTCvkt3zOYK8iQtg02UrupYcob4zmsHH2
                        bGFtsxwv0/TNZ5L5a/Tf49kzN8BxF8I6+D1vBIO1Ha6Uc5d9wyYnswAm2Qwou74rXfOSJAnOJEmS
                        9htwl/5fDfw5BWi3c75g/9GbtWdhRXA2sdhkZnQgMENAc3DEvrN725YkelYInSfvCM78tU4B0Hx7
                        BQDD0sZoePw59Z1FpY2zBM6qAoTpmpckSXAmSZJ0BEjjz2uFXMLjj5kizMZMkqA/Cv55kPEhsmeY
                        IboHoJoDUNXWdp/01ziiOAAzcVi6OAf4ima/nZOFPJefRtmzCM7MDjfIXJIkSXAmSZK0J3iTbvNc
                        8OzZsgna59bOxtwBDHkpoDs5olnIIbJnCCIIIfia3LAD+ywdztBW3hpwGTXfy8Dn2cEl7Z+sT+uU
                        UGbW7hOMBlKztf5IgCZJkuBMkiRJki4H0njumWepNkD2+e/ti/3HaOKzdU0mDhHoc2kjAqODGc7j
                        c2t9d6CcEJCsIBZYB7/Xs4UOb7h/ztGxtA/O8D1h350kSZLgTJIkSZLOGM7YEdEdAF9ta5rxYm2D
                        DM9UIbwcKnOGLooOjQxn3ivmvWcv1nZpXDY/W1nbVh4hzeEsMj05NzDD/eL7BjOBJYdJZc0kSRKc
                        SZIkSdIZKoKP0liGYw4n99flZZM8TJpdFOfwWh3Q/P345/x3oQEIljnW1i51nNjp7PP79s3IYiMX
                        zpydK2RKkiQ4kyRJkiQBWRLgsyEID58+ZZCP2bMNaN0TLHrmDodKO4wZwJnPPXVHRu+7899tFlvS
                        j6xd7njKY1dbu++MyxunyTEUoEmSJDiTJEmSpDOEsszxz802PsL2weJhzMcI9rPs2b11545tvvZK
                        0OX9aP5v779a2zbrNiIA88zcPQFadSaAk40awP65zK1RkiSppf/1v/+n4EySJEmSTgxlnG3xbJEb
                        gHz9e/vl7+1b8+/PzdfQpj0CtEP2nnH5IZqR4PuZA3ihIYjB59CtctxAmMcL99Z2psQh3KMzOqZ8
                        PCcBmEU9Z+o7kyTp5Do6nG0o9Ldff9eelyRJks4tiOcSuHsAkk/2H2fGDZj94+/tv5qPvxCgoQsg
                        g9kh5p3VAaBl4LbJnrnNfmRWgnP/HDKn8PG+2Q/+Xmd2nr1bUQYUt2wItQnQJElyXrkZOJMkSZKk
                        MwIz7ifzgcU4w8wt87812wbK/tlsm39/tXb2DMvl6p7XsY/3YhZnrhA63UrenRw9g2YJpCGo+c/j
                        bDfMnJ1j31Y084z7zdRzJknSWYGZ4EySJEm6VTCL+soQyj41UOZg9rUBs19sW9b4S/P5Lw2czWyb
                        NfPyQAz8s96sfUHaKHmfOO8L4QxNQ+rC7/Sf9yHbOGyb56ZVZ3J8MSMaARqbuZgpayZJ0hlIcCZJ
                        kiTdKphhpsxL9j4RkOH2Df79pfm+T7Y1BplAgO/W9VUADAhS+yh35PLG0nt1MPMts//nni0e5nyu
                        JY0lCOdtRMdEkiTpv9uvVNYoSZIkSccN1tGFEXvKHMK+AYx9a77mm0Oc96R5eZ/Zdu6ZEXSNCArY
                        kGLfgJZlCJc2bDZb1ovH5YHnljWrAxjm0tXo9QvOJEk6CwnOJEmSpFuDM88ifSAoc7MPLF10MPMs
                        mbsVcvaotm0mCqHH/zYDDgJdBb9jX4BmAaStbTsPDV9nTVtmlsJZJ3Y6PJfjnAEmmoGc83uQJOnE
                        OmX2bHKKNytJkiRJJwYzL2N0KPsnbd5P9hWgLOq1MmtnoxbWNtyobet2OIO/vbatTf3Y9ufoWCWw
                        5vC3bl77OgEz3mfcu1UFQFOd6THPwExDqCVJOlspcyZJkiTdAphh9sqzZp8bCNvY4v8Ltk327BuA
                        2YcEyjz7tIGxOW1vzdd8QDSWUC6b38nmE/vsfeISvxpAsU6grC7suyoBsurMj3mVANrIZKUvSVJB
                        p8qeCc4kSZKkWwA07DXzodJfAc7+R7P9y7ZZMwczNr9Y2zZLtgGxzfywl7+352Z7te3AZ3/W3tnW
                        bARt7NnJ0fYIPWjnX1nX3j+Dsuh3RDBWXchxz7YoCyhJknRSCc4kSZKkW4MzL2n0odL/tG32bPPv
                        bw1EOZihPT5D2QbGnv7eHpvtCQBtaduBzj4vbfNzK4t7uw7lHFgN+Hy9w89WF3LMzeLSTAY0QZkk
                        SYIzSZIkSTpCgB7N+7oDWML5ZV7K+Nnac8s2WgdQ5kD24+/tofn4GMDZrPl935rfsba4JwpLEA8J
                        QZcKXD8LaEP75FTaKEmS4EySJEmSDhyojwDOfOC02+ij6Qdmy7yv7K0BM8+UOYx9b7YfBGeeIXM4
                        +wTAZtYdjBz1Qf2sOYjUD2GSJEmCM0mSJEk6YnCezfzyAdQzi80+3uDjq23LFx3E/mo2h7OH5usv
                        DZytm9+3+f2bbNzCtgYhbkyCf5vdAwUPkiRJgjNJkiRJunpI496uDTS5Hf7ctuWHC9uWMWK27C/Y
                        oqzZguAMM2kTAEOEwykB2gheu/Q+1e/8miRJkuBMkiRJkg4YpPvmpYpug7/JjL00oOTPxgpAzfvL
                        GMy8pPHB2r1mb83P1gBnq+Z3jwHM7m07O80hDTNoKmvcD5jVlo8PELRJkiQ4kyRJkqQTBeieHXMg
                        84zYtPn6i22HQnvWLOoxw1LGpwDMcAD1EkBrCmC26XH70Gw44BqzZ4c2B7nGYx3BeLb1gZokSZLg
                        TJIkSZL2HLQ7mLnj4ksDVT+aZ+HattmzEXzvC8EZfvRsmfeYOZitbDvHbGRbd8ZxAGduSIJmJFH/
                        mbQ7lNVwLFa0rQHchmbUJEm6IZ1iALXgTJIkSbqFoN2DcJ9R5tmwGYDY5nMfGniqbOvQ6N+Ls8x8
                        ntmLbbNliwDMzNoZNIezB9vOWkOnyA8JoN1i9qx+x/dEZaueKeXNvyYokyTprHR0ONtQ6G+//q49
                        L0mSJB0z0PeA3eHMnRndjXEDW3fWnmvm9vle/uibQ5kbfywAyjATg1mvhW1nrc1smzljQMPyRn+N
                        15Q9q9/x9brw/zo4zgji3lPox5JBeiU4kyQp4pWbgTNJkiRJOiGcvVm7n8tLF7Hfy6zdm+Yg5h8R
                        ypYQ4Ec9TDX9Piyp3GTQvjdg9tnaGbRLyp69N8s1FLj433Xh3wzhL/TxFWBtCTA39H1IkiQwE5xJ
                        kiRJ0k+Cg/cfVQ0g1QBrL7bNVDn8ePbFAW0BAf0CAnsujWOYqCwuq0QHyA2YfWk+fm7g7NTZs/qd
                        37MrdA0Bruj7ol4x3M9vAMFehopZTz+m2H8mSZJ0cgnOJEmSpFuBNIcphLWFdQ048OvYs8SGEmvr
                        71mqAfbYuh+HWn8BQMPsGbo37iN7duiyQnsHdPUBF2fG2IERP89unJvsJA4Kd0ibE2QL0CRJ+m9t
                        2q9U1ihJkiRJhwUz18q65W9jaw99NtvNgn0I8PDf9PLGR9s6QDqcfbJ29ozB0QjSzqmsMPq+EnSV
                        gCv62TXsxzWBMvab4f7dwNkftp1Jh3DGmTMBmiRJJ5XgTJIkSbo1QEMYqAh8qoFwsWsgz2YV3svG
                        5Y2+sbW+g+O4AFjvga5DAJfZsCwXf42BK/sdK9iPq+Bncf/6vv2z2X7YdiYdZs5kCiJJ0v/TKbNn
                        k1O8WUmSJEk6IaBheaDb5lcDvv9nsivefzY0e8bGIAyQ1Q7wdYyywl2zXPz1CLj4bzCArZJtCfv3
                        Gfatlzc+AZyp50ySpLOSMmeSJEnSLQJa9v/KhmWk3vu3o+yOAwS7Nm4yZ2hUUgegdi5lhe/JcjGc
                        RcAVwdlyAKAtrJuddAh+snZZo8BMkqSOTpU9E5xJkiRJArX9Qljf38uyZz8aKPOsGfacOZxMrdsb
                        dw5lhbtmubKMWWa8wn8/AzP8OgLaC2w+EmFpw0xdJEmSBGeSJEmSdMVQyJbvGxB7aKDMwWxm7blr
                        C4CzKgGtU5YV7pLlWgeQ1vc7o5+JII4zaA5pOIRaJY2SJAnOJEmSJElg9t/i7NlzA2N3AGZezrhu
                        oOKjtTNntcUZsVOVFb4ny7VOYGvV896yv8cgt6LX61s0o06SJElwJkmSJEk3CmmcPZvadraZ95bV
                        DcBtvv6B4KwEJ6coK3xPlms9ALhK/XGl7OHaho1DEJhJkiQ4kyRJkqQbBjOzOHuGA7GtgaBNj9QD
                        wFlFPx+VLJ6qrHCXLNfQvrhdN7Pc9ORnxiFIkiQJziRJkiTpiiHN4eXNusOmvZxxA23u3ojOjVHP
                        2KnLCt+b5RoCW1aALyt8X+mjJEmS4EySJEmSBGb/D8B8ztrctjPMattmzTZOjj7zbExwVjL7OEVZ
                        4XuzXEOAq/Tvvq8JyCRJEpxJkiRJkjQY0BbweS9J3ADbk2170dipMQOzU5UVmr0/y9UHXEMgSwAm
                        SZLgTJIkSZKkn4K0Ff1/3cDaK4AZ9qL1DY8+dVnhrtBVD9hHkiRJR9MpBlALziRJkiTp9GDmWhFM
                        uZMjmoRUBEc/U1J4aODqgyoBlyRJEqk6xR/97dffteclSZIkqf089m1U2GwAUJ2yrFDQJUnSxetU
                        WbONlDmTJEmSpNOLQWoNoObQZtbOnJmprFCSJOlqwExwJkmSJEnnB2j+74o+V70DsFRWKEmSdEEa
                        aRdIkiRJ0tlBGmbQsllkmeV9ZhCSlTdKkiRJjU7dfqXMmSRJkiSdL6RJkiRJNyRlziRJkiRJkiRJ
                        khqdMns2uqU3K0mSJEmSJEmSdK5S5kySJEmSJEmSJAl0qoSS4EySJEmSJEmSJOkMJDiTJEmSJEmS
                        JEkSnEmSJEmSJEmSJEmCM0mSJEmSJEmSJMGZJEmSJEmSJEmSJDiTJEmSJEmSJEkSnEmSJEmSJEmS
                        JEmCM0mSJEmSJEmSJMGZJEmSJEmSJEnS+ep//e//KTiTJEmSJEmSJEm6VVWn+KO//fq79rwkSZIk
                        SZIkSWenU2XNNlLmTJIkSZIkSZIk6cRgJjiTJEmSJEmSJEk6EwnOJEmSJEmSJEmS7PTtV4IzSZIk
                        SZIkSZKkM5DgTJIkSZIkSZIkqdEps2ejW3qzkiRJkiRJkiRJ5yplziRJkiRJkiRJkkCnSigJziRJ
                        kiRJkiRJks5AgjNJkiRJkiRJkiTBmSRJkiRJkiRJkiQ4kyRJkiRJkiRJEpxJkiRJkiRJkiRJgjNJ
                        kiRJkiRJkqQz0v8VYAAaHbtgKsw8IQAAAABJRU5ErkJggg=="
              transform="matrix(1 0 0 1 -36.1963 -21.6399)"
            />
          </g>
        </svg>
      </template>
      <template #after>
        <svg
          height="400"
          version="1.1"
          width="920"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          style="overflow: hidden; z-index: -99"
          viewBox="0 0 920 400"
          preserveAspectRatio="xMinYMin"
        >
          <template v-for="(location, i) in map.locations">
            <text
              :key="`text-${i}`"
              class="svg_location_text"
              :x="location.text.x"
              :y="location.text.y"
              text-anchor="middle"
              font-family='"Arial"'
              font-size="14px"
              stroke="none"
              :fill="fillColor(location)"
              style="
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                text-anchor: middle;
                font-family: Arial, serif;
                font-weight: bold;
                font-size: 14px;
                opacity: 0.6;
                cursor: pointer;
              "
              opacity="0.6"
              :data-id="location.dataId"
              @click="setLocation(location.id)"
            >
              <tspan
                :key="`tspan-${i}`"
                :dy="location.tspan"
                style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0)"
                v-text="`${location.name}`"
              />
            </text>
          </template>
        </svg>
      </template>
    </radio-svg-map>
    <div class="svg__block__map__tooltip" :style="tooltipStyle">
      <v-list>
        <v-list-item dense>
          <v-list-item-avatar>
            <v-avatar class="white--text" color="primary">
              {{ percent }}%
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="selected.name" />
            <v-list-item-subtitle
              v-text="
                $tc('parks.map.tooltip', selected.parksCount || 0, {
                  count: selected.parksCount,
                })
              "
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import { RadioSvgMap } from 'vue-svg-map'
import { Stats } from '~/models/services/parks/Stats'
export default {
  name: 'VMap',
  components: {
    RadioSvgMap,
  },
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    model: new Stats(),
    map: {
      label: 'Mapa de Bogotá',
      viewBox: '0 0 920 400',
      locations: [
        {
          id: '1',
          name: 'Usaquen',
          path: 'm 15.87,53.72 c 2.57,-4.49 1,-11.21 6.77,-13.87 11.19,-1.48 20.14,-2.73 30.3,-2.35 2.97,-7.65 -0.25,-18.45 10.12,-22.02 18.61,-1.32 23.8,6.7 40.69,6.68 6.1,-4.94 9.5,-15.72 23.46,-12.43 2.05,1.24 0.73,4.82 1.08,7.27 7.2,-1.07 3.82,-7.48 7.77,-10.16 l 23.19,-2.32 0.19,9.36 c 15.53,1.69 29.08,4.88 49.43,3.19 2.48,-0.55 0.25,-3.38 0.84,-4.85 5.27,-0.71 8.5,-2.41 14.41,-2.8 0.49,2.71 2.43,4.36 3.83,6.42 12.71,0.4 31.2,-3.52 42.76,-2.24 0.63,2.46 -0.32,6.13 1.92,7.39 9.73,1.55 20.71,2.17 21.83,10.42 -7.65,2.73 -19.54,3.4 -22.11,8.61 8.04,10.38 -3.67,19.51 -8.87,27.83 -85.7,1.63 -164.98,-0.76 -247.7,0.06 -0.54,-1.89 1.94,-5.86 -0.59,-6.36 l 0.68,-7.84 z',
          dataId: 'usaquen',
          image: {
            x: '150',
            y: '5',
          },
          text: {
            x: '160',
            y: '45',
          },
          tspan: '4.140625',
          parksCount: 0,
        },
        {
          id: '2',
          name: 'Chapinero',
          path: 'm 382.77,45.49 c 12.53,-2.79 19.69,2.21 28.3,4.87 9.96,-0.41 16.47,-2.29 25.43,-3.12 l 2.93,24.27 C 383.19,70.25 321.65,69.71 268.77,68.81 c 10.21,0.17 16.29,-20.49 9.02,-29.77 12.84,-2.5 25.39,-7.57 38.6,-6.51 10.09,0.81 18.43,9.28 34.72,9.23 8.24,-0.03 12.68,-2.37 24.21,-1.53 5.39,-0.44 3.79,4.39 7.45,5.26 z',
          dataId: 'chapinero',
          image: {
            x: '340',
            y: '20',
          },
          text: {
            x: '350',
            y: '60',
          },
          tspan: '4.140625',
          parksCount: 0,
        },
        {
          id: '3',
          name: 'Santa Fe',
          path: 'm 577.35,54.74 c 3.25,1.74 3.51,10.63 5.29,15.99 -10.55,7.2 -20.82,14.64 -31,22.22 -14.4,-2.98 -29.45,-7.39 -46.86,-11.76 -20.39,-5.14 -32.97,-13.98 -56.97,-3.12 -5.62,-7.22 -4.46,-21.06 -5.87,-29.84 14.66,2.74 30.71,3.09 47.29,1.24 1.73,-0.19 8.47,5.75 10.2,5.36 -0.17,-0.45 73.22,-2.59 77.91,-0.09 z',
          dataId: 'santafe',
          image: {
            x: '460',
            y: '23',
          },
          text: {
            x: '470',
            y: '63',
          },
          tspan: '3.6796875',
          parksCount: 0,
        },
        {
          id: '4',
          name: 'San Cristobal',
          path: 'm 738.72,91.39 c 9.49,-3.59 22.84,-16.04 11.83,-21.09 -15.86,-7.29 -52.44,-10.22 -76.8,-6.49 -3.31,1.69 -0.87,5.7 -5.44,6.9 -7.41,0.29 -16.97,2.47 -22.71,1.32 -1.87,-4.87 -3.27,-10.09 -6.5,-13.69 3.07,-1.99 13.11,-1.19 11.59,-5.01 -15.4,-10.68 -51.23,-2.88 -65.34,5.32 0.15,4.21 1.31,8.86 3.32,13.9 -10.81,6.92 -20.76,14.3 -29.87,22.14 l -0.91,0.79 c 13.92,2.43 25.26,8.32 38.87,12.01 0.52,0.14 1.36,-1.16 1.71,-1.58 21.54,5.64 40.35,13.41 58.96,22.28 12.57,-9.69 24.37,-14.55 36.68,-24.11 5.25,-3.52 16.04,-6.37 27.69,-8.89 2.78,-0.58 16.03,-3.46 16.92,-3.81 z',
          dataId: 'san_cristobal',
          image: {
            x: '650',
            y: '50',
          },
          text: {
            x: '660',
            y: '90',
          },
          tspan: '4.140625',
          parksCount: 0,
        },
        {
          id: '5',
          name: 'Usme',
          path: 'm 781.11,73.02 c -0.8,0.62 -4.12,-0.12 -4.78,0.55 -19.29,1.42 -20.37,16.87 -34.94,20.32 -0.89,0.21 -17.27,3.39 -18.6,3.75 -11.34,3.1 -22.33,6.09 -27.6,9.62 -12.3,9.59 -21.66,11.52 -34.23,21.23 6.03,2.89 8.93,5.73 14.89,8.74 8.83,1.3 20.86,-0.1 32.41,-1.26 2.17,1.87 4.12,3.95 5.52,6.57 11.4,1.06 28.23,-3.05 39.59,-1.93 5.33,9.53 20.6,9.42 35.04,10.21 9.48,-9.37 34.4,-4.27 55.16,-6.98 -13.07,-17.75 12.89,-22.6 39.04,-20.66 1.92,-5.11 -7.78,-12.28 -6.92,-18.59 4.03,-1.49 6.48,-3.59 8.29,-5.93 -2.59,-3.66 -3.42,-9.05 -7.43,-11.21 -22.57,2.97 -41.95,2.8 -58.16,-0.44 -6.18,0.5 -13.5,2.11 -15.96,-1 0.3,-0.92 0.59,-0.83 0.97,-1.73 0.07,-0.21 0.17,-0.43 0.26,-0.63 -8.89,-2.35 -14.25,-7.87 -22.54,-10.63 z',
          dataId: 'usme',
          image: {
            x: '780',
            y: '80',
          },
          text: {
            x: '790',
            y: '120',
          },
          tspan: '4.140625',
          parksCount: 0,
        },
        {
          id: '6',
          name: 'Tunjuelito',
          path: 'm 717.83,151.3 c 7.72,-1.93 11.99,-6.57 17.32,-6.68 -40.07,0.77 -63.02,7.42 -81.8,18.52 -23.4,-6.98 -34.16,10.24 -60.14,11.25 1.07,-3.07 -13.42,-12.63 -14.72,-12.43 -6.45,1.53 -4.45,4.11 -12.37,4.99 4.78,12.73 6.48,35.42 14.95,72.66 l 29.75,-2.35 -4.84,-22.7 c 37.95,-18.46 77.47,-35.6 112.59,-54.01 -1.94,-3.83 2.61,-4.88 -0.73,-9.26 z',
          dataId: 'tunjuelito',
          image: {
            x: '600',
            y: '155',
          },
          text: {
            x: '610',
            y: '195',
          },
          tspan: '4.6015625',
          parksCount: 0,
        },
        {
          id: '7',
          name: 'Bosa',
          path: 'm 568.05,220.16 c 6.74,34.79 33.31,83 25.94,117.07 l -91.81,8.63 c -6.78,-8.17 -9.84,-19.61 -17.12,-26.98 -12.61,1.71 -16.63,12.6 -28.89,11.42 -5.88,-14.16 16.22,-13.61 20.24,-22.4 -1.82,-8.3 -10.41,-10.35 -11.78,-18.89 10.4,-4.95 26.26,-7.11 42.32,-9.16 7.18,13.74 4.74,36.88 31.39,32.95 7.21,-4.88 4.44,-12.7 -0.51,-20.21 7.34,-10.01 24.72,-14.92 31.77,-24.81 -9.99,-17.88 -18.51,-37.45 -1.55,-47.63 z',
          dataId: 'bosa',
          image: {
            x: '560',
            y: '285',
          },
          text: {
            x: '570',
            y: '325',
          },
          tspan: '5.0625',
          parksCount: 0,
        },
        {
          id: '8',
          name: 'Kennedy',
          path: 'm 504.77,170.15 c 13.68,12.03 40.44,12.87 60.39,19.94 13.61,24.2 -24.15,37.82 -14.38,59.21 3.25,7.11 13.68,10.4 14.34,18.9 -11.81,6.7 -21.86,14.33 -36.16,19.97 0.85,8.34 9.96,13.63 7.05,21.63 -18.67,0.07 -18.53,-18.06 -18.09,-28.92 -13.62,-4.76 -32.98,-4.2 -40.02,-14.68 -19.48,5.42 -34.19,24.93 -53.9,10.14 3.16,-5.28 14.43,-6.39 17.32,-11.75 -2.61,-5.81 -10.78,-6.73 -14.3,-11.64 3.07,-6.32 13.01,-9.16 17.92,-14.46 -1.18,-7.6 -9.83,-17.21 -14.05,-25.53 -10.98,2.14 -17.04,0.09 -22.31,-2.61 -21.28,3.69 -30.57,-2.6 -40.41,-8.3 18.36,-11.89 38.68,-22.58 56.43,-34.23 23.13,2.85 51.94,13.73 80.18,2.32 z',
          dataId: 'kennedy',
          image: {
            x: '480',
            y: '185',
          },
          text: {
            x: '490',
            y: '225',
          },
          tspan: '4.96875',
          parksCount: 0,
        },
        {
          id: '9',
          name: 'Fontibon',
          path: 'm 393.16,150.6 c 9.41,-7.57 34.77,-18.43 15.4,-27.77 -41.22,22.25 -84.95,45.38 -128.82,68.5 -6.54,-0.98 -8.4,-6.61 -16.04,-6.69 -21.06,15.81 -43.74,38.96 -64.06,59.47 4.89,4.27 3.66,10.15 3.64,14.11 3.24,1.47 11.89,-1.3 14.65,0.57 3.17,4 0.31,6.49 2.2,11.57 8.3,1.29 11.26,6.92 12.76,13.77 14.86,-3.51 17.46,5.64 30.21,4.23 10.32,-1.13 14.83,-10.45 25.98,-9.5 12.62,1.04 8.47,17.04 29.95,12.43 8.33,-5.57 12.31,-13.38 28.15,-14.85 0.75,-5.74 0.02,-12.2 -1.19,-18.87 8.46,-0.71 14.2,-2.79 18.43,-5.68 -0.13,-5.1 -5.67,-4.97 -7.3,-9.07 -2.59,-6.42 2.29,-13 0.01,-19.18 -1.19,-3.17 -6.23,-4.37 -5.56,-7.95 10.01,-23.27 47.68,-32.37 68.52,-49.24 -5.61,-8.14 -20.8,-8.37 -26.92,-15.86 z',
          dataId: 'fontibon',
          image: {
            x: '290',
            y: '205',
          },
          text: {
            x: '300',
            y: '245',
          },
          tspan: '5.0625',
          parksCount: 0,
        },
        {
          id: '10',
          name: 'Engativa',
          path: 'm 271.05,108.84 c -11.59,10.45 -26.84,20.24 -54.46,19.51 -31.68,20.71 -62.69,42.71 -94.78,65.14 0.73,4.86 -1.1,12.07 0.01,14.31 13.84,1.15 31.32,-10.62 37.89,0.06 -10.44,4.77 -6.63,17.44 -13.66,24.28 6,4.94 9.71,11.72 13.32,18.62 4.38,-0.12 11.19,-2.11 11.61,0.82 4.33,6.23 -4.74,11.39 -3.79,18.82 14.34,-4.4 22.26,-12.31 31.33,-19.48 -2.18,-2.27 -7.68,-1.95 -7.53,-6 6.95,-11.07 21.76,-20.09 36.73,-34.33 12.72,-12.09 35.31,-44.43 52.93,-24.86 28.91,-14.97 57.83,-27.93 83.48,-43.52 -6.04,-2.6 -73,-29.3 -93.09,-33.39 z',
          dataId: 'engativa',
          image: {
            x: '210',
            y: '140',
          },
          text: {
            x: '220',
            y: '180',
          },
          tspan: '4.6015625',
          parksCount: 0,
        },
        {
          id: '11',
          name: 'Suba',
          path: 'm 246.73,73.54 c -0.14,11.89 3.02,22.78 3.02,32.27 1.38,2.94 9.67,0.69 13.3,1.96 -32.99,25.78 -36.42,13.18 -53.72,19.62 0,0 -26.79,18.71 -47.83,33.72 -19.29,13.76 -35.64,24.68 -49.75,34.22 0.35,6.74 -0.04,13.15 -2.88,18.21 -30.05,1.1 -12.15,-22.45 -18.61,-36.34 -2.17,-4.7 -29.92,-17.06 -39.5,-17.59 -8.21,-0.44 -13.75,1.9 -21.39,3.67 -7.47,-6.85 -20.5,-9.71 -26.38,-17.44 12.53,-8.96 29.29,-15.42 41.79,-24.1 l 66.11,-6.17 C 107.11,97.63 59.23,110.55 28.7,111.42 10.4,106.84 13.15,90.45 15.15,72.91 l 231.58,0.63 z',
          dataId: 'suba',
          image: {
            x: '140',
            y: '85',
          },
          text: {
            x: '150',
            y: '125',
          },
          tspan: '4.140625',
          parksCount: 0,
        },
        {
          id: '12',
          name: 'Barrios Unidos',
          path: 'm 360.54,74.2 c -0.93,5.46 0.83,12.21 1.89,18.69 -15.58,8.38 -33.12,16.06 -49.34,24.46 -20.16,-5.15 -33.21,-12.98 -55.71,-13.06 -1.15,-11.87 -3.09,-12.32 -2.62,-31.17 36.37,-1.41 71.53,0.66 105.79,1.07 z',
          dataId: 'barriosunidos',
          image: {
            x: '295',
            y: '50',
          },
          text: {
            x: '305',
            y: '90',
          },
          tspan: '4.6015625',
          parksCount: 0,
        },
        {
          id: '13',
          name: 'Teusaquillo',
          path: 'm 446.42,99.1 c -4.71,-6.67 -4.85,-16.53 -8.63,-24.5 -25.38,0.39 -48.38,-0.99 -74.25,-0.1 1.25,6.69 -0.14,12.25 2.05,19.49 -15.95,8.47 -32.96,17.97 -50.37,26.11 5.25,1.25 43.11,17.25 54.61,19.8 25.56,-13.86 52.53,-27.04 76.6,-40.8 z',
          dataId: 'teusaquillo',
          image: {
            x: '385',
            y: '65',
          },
          text: {
            x: '395',
            y: '105',
          },
          tspan: '4.6015625',
          parksCount: 0,
        },
        {
          id: '14',
          name: 'Martires',
          path: 'm 551.53,97.06 c -10.24,9.06 -17.71,16.62 -26.63,26.02 -25.92,-12.49 -47.94,-19.26 -74.59,-26.37 -0.29,-3.66 -2.37,-9.13 -1.49,-13.47 21.27,-12.65 36.67,-2.52 64.66,4.44 8.85,2.2 31.58,7.59 38.05,9.39 z',
          dataId: 'martires',
          image: {
            x: '500',
            y: '63',
          },
          text: {
            x: '510',
            y: '103',
          },
          tspan: '3.6796875',
          parksCount: 0,
        },
        {
          id: '15',
          name: 'Antonio Nariño',
          path: 'm 553.52,99.09 c -9.35,8.4 -18.36,16.45 -25.99,25.86 28.97,18.15 30.26,26.31 38.68,39.44 17.83,-3.59 9.35,-21.87 9.85,-34.02 7.67,-6.91 13.44,-12.03 20.58,-19.97 0.23,-0.25 -32.73,-9.19 -40.83,-13.23 -1.06,0.93 -1.25,0.97 -2.29,1.91 z',
          dataId: 'antonionarino',
          image: {
            x: '550',
            y: '80',
          },
          text: {
            x: '560',
            y: '120',
          },
          tspan: '3.6796875',
          parksCount: 0,
        },
        {
          id: '16',
          name: 'Puente Aranda',
          path: 'm 563.84,185.58 c -22.59,-3.9 -46.53,-6.44 -57.41,-20.07 -42.65,14.74 -82.67,-1.12 -105.05,-15.67 7.52,-5.72 16.63,-10.62 23.05,-16.72 -3.18,-4.52 -6.62,-8.8 -9.64,-13.37 13.5,-6.36 26.2,-12.99 37.88,-19.99 45.54,15.65 104.93,26.16 111.17,85.83 z',
          dataId: 'puentearanda',
          image: {
            x: '475',
            y: '110',
          },
          text: {
            x: '485',
            y: '150',
          },
          tspan: '4.6015625',
          parksCount: 0,
        },
        {
          id: '17',
          name: 'Candelaria',
          path: 'm 497.7,50.17 c -1.75,-4.98 -3.5,-10.95 -3.5,-10.95 0.43,-6.39 14.39,-0.93 30.57,-4.11 5.47,0.49 14.9,3.41 17.04,-1.02 13.86,3.57 21.11,0.23 35.23,2.24 1.88,1.83 3.72,12.98 -0.38,13.04 -14.06,0.18 -78.8,1.24 -78.97,0.79 z',
          dataId: 'candelaria',
          image: {
            x: '560',
            y: '18',
          },
          text: {
            x: '560',
            y: '42',
          },
          tspan: '4.140625',
          parksCount: 0,
        },
        {
          id: '18',
          name: 'Rafael Uribe',
          path: 'm 598.55,171.09 c 19.55,-3.07 29.68,-16.76 53.17,-11.32 9.78,-11.14 35.52,-13.13 58.95,-16.45 -2.71,-6.73 -5.52,-2.32 -38.29,-3.46 -5.74,-9.74 -64.55,-25.81 -70.9,-29.95 0,0 -16.76,17.55 -22,21.75 2.96,10.37 -0.06,21.14 6.17,30.84 2,2.14 5.42,3.8 7.23,6.03 1.59,1.39 3.02,2.11 5.68,2.57 z',
          dataId: 'rafaeluribe',
          image: {
            x: '620',
            y: '105',
          },
          text: {
            x: '630',
            y: '145',
          },
          tspan: '4.140625',
          parksCount: 0,
        },
        {
          id: '19',
          name: 'Ciudad Bolivar',
          path: 'm 781.8,192.6 c -0.08,-3.38 4.59,-4.7 2.2,-9.03 -12.72,-6.87 -33.4,-5.68 -43.1,-15.22 1.23,-9.97 18.05,-11.58 11.82,-24.45 -17.33,0.59 -16.59,7.01 -30.12,9.23 l 3.3,8.11 c -36.94,18.13 -76.07,35.98 -115.45,54.36 l 5.67,24.74 c -11.52,1.89 -21.61,0.95 -32.83,2.56 1.34,15.99 5.83,29.88 13.51,45.72 6.07,0.04 10.49,1.65 17.79,0.52 4.89,-5.96 -4.46,-16.78 -4.87,-21.05 3.42,-9.8 32.43,-9.41 47.84,-8.75 5.51,-1.72 0.49,-8.34 7.93,-9.14 l 3.52,10.17 c 11.37,-0.71 16.92,-4.13 18.95,-9.15 -5.26,-7.54 -18.54,-12.82 -17.32,-22.14 16.19,-1.76 29.35,-0.29 36.56,-6.49 8.44,5.65 18.15,10.1 28.82,13.71 7.07,-3.67 13.68,-7.54 28.31,-7.81 -0.96,-5.1 -6.55,-5.46 -8.59,-9.42 -5.31,-0.16 -13.46,2.56 -16.95,0.56 0.19,-1.79 -4.1,-5.55 -0.85,-5.98 7.2,-1 12.71,2.22 21.5,3.03 3.14,-4.46 13.96,-5.57 25.38,-6.43 2.49,-3.89 8.62,-6.21 5.42,-12.51 -1.16,-3.4 -7.8,-1.23 -8.43,-5.14 z',
          dataId: 'ciudadbolivar',
          image: {
            x: '730',
            y: '165',
          },
          text: {
            x: '730',
            y: '205',
          },
          tspan: '5.0625',
          parksCount: 0,
        },
        {
          id: '20',
          name: 'Sumapaz',
          path: 'm 808.34,77.99 c 2.62,5.69 15.16,1.05 21.25,0.5 1.36,1.81 3.61,2.78 4.15,5.42 14.76,-0.86 33.95,0.03 47.45,-3.6 -2.47,-5.7 -8.52,-14.11 -9.35,-17.28 l 17.26,-1.61 c -2.35,-4.37 -1.65,-6.2 -4.7,-8.47 -4.39,-1.18 -11.78,0.62 -17.57,0.83 l -4.95,-9.12 c -16.4,1.22 -30.21,3.39 -42.08,6.31 -3.31,1.89 5.37,4.44 1.79,6.24 -7.65,-1.04 -18.91,1.41 -28.05,1.81 -0.53,5.43 -6.08,7.26 -11.1,11.01 -0.35,0.25 5.16,2.03 4.84,2.29 8.34,2.77 8.71,5.12 16.87,8.84 1.83,0.84 1.64,-2.01 4.21,-3.17 z',
          dataId: 'sumapaz',
          image: {
            x: '830',
            y: '35',
          },
          text: {
            x: '840',
            y: '73',
          },
          tspan: '4.140625',
          parksCount: 0,
        },
      ],
    },
    selectedLocation: null,
    selected: {},
    pointedLocation: {},
    focusedLocation: {},
    total: 5302,
    tooltipStyle: null,
  }),
  computed: {
    percent() {
      const data = this.selected.parksCount || 0
      const number = (data * 100) / this.total
      const total =
        Math.round(number) === 0 ? number.toFixed(1) : Math.round(number)
      return isNaN(number) ? 0 : total
    },
  },
  watch: {
    filter(val) {
      this.model = new Stats(val)
      // this.getByLocation()
    },
  },
  created() {
    this.getByLocation()
  },
  methods: {
    getByLocation() {
      const {
        location,
        upz,
        neighborhood,
        enclosure,
        admin,
        certified,
        vigilance,
        stratum,
      } = this.model
      this.model.resetOnlyWhenUpdate = false
      const params = {
        location,
        upz,
        neighborhood,
        park_type: this.model.park_type,
        enclosure,
        certified,
        admin,
        vigilance,
        stratum,
        equipment_id: this.model.equipment_id,
        endowment_id: this.model.endowment_id,
      }
      this.model
        .byLocality({ params })
        .then((response) => {
          this.total = response.details.total || 0
          this.map.locations = this.map.locations.map((location) => {
            const x = response.data.find((l) => l.id === location.id)
            return {
              ...location,
              parksCount: x.parksCount || 0,
            }
          })
        })
        .then(() => {
          this.$emit('ondata', this.map.locations)
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
    },
    getLocationId(node) {
      return node && node.attributes.id.value
    },
    getObjectData(id) {
      if (id) {
        return this.map.locations.find((l) => l.id === id)
      } else {
        return {}
      }
    },
    focusLocation(event) {
      this.focusedLocation = this.getLocationId(event.target)
      this.$emit('change', this.getObjectData(this.focusedLocation))
    },
    blurLocation(event) {
      this.focusedLocation = null
    },
    pointLocation(event) {
      this.pointedLocation = this.getLocationId(event.target)
      this.selected = this.getObjectData(this.pointedLocation)
    },
    unpointLocation(event) {
      this.pointedLocation = null
      this.tooltipStyle = { display: 'none' }
    },
    moveOnLocation(event) {
      this.tooltipStyle = {
        display: 'block',
        top: `${event.clientY + 10}px`,
        left: `${event.clientX - 100}px`,
      }
    },
    setLocation(id) {
      if (id) {
        this.selectedLocation = id
        this.$emit('change', this.getObjectData(id))
      }
    },
    fillColor(item) {
      const data = (item.parksCount * 100) / this.total
      const i = isNaN(data) ? 0 : Math.round(data)
      return i > 5 ? '#fff' : '#000'
    },
    getLocationClass(location, index) {
      const data = (location.parksCount * 100) / this.total
      const i = isNaN(data) ? 0 : Math.round(data)
      const total = i * 10 > 100 ? 100 : i * 10
      return `svg-map__location-heat-${total}`
    },
  },
}
</script>

<style lang="css">
.svg-map {
  width: 100%;
  height: auto;
  stroke: #ccc;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.svg-map__location {
  fill: rgb(244, 244, 232);
  cursor: pointer;
}
.svg-map__location:focus,
.svg-map__location:hover {
  outline: 0;
  transform: scale(1, 1.03);
  transition: fill, transform 0.5s ease-in-out;
}
.svg-map:focus,
.svg-map:hover {
  stroke-width: 0.94;
  transition: stroke-width 0.5s ease-in-out;
}
.svg__block__map__tooltip {
  position: fixed;
  width: 200px;
  padding: 10px;
}
</style>
