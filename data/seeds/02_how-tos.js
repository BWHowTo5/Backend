exports.seed = async function(knex) {
  await knex("how-tos").insert([
    {
      id: 1,
      title: "Test How-To #1",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique libero id rutrum mollis. Duis magna sem, sollicitudin vitae ante non, vestibulum hendrerit nibh.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique libero id rutrum mollis. Duis magna sem, sollicitudin vitae ante non, vestibulum hendrerit nibh. Morbi lobortis commodo diam eget maximus. Nunc ut augue pretium ex gravida tristique. Nullam risus augue, sollicitudin non tempus eu, semper at lacus. Donec facilisis arcu non sagittis imperdiet. Vestibulum volutpat fringilla arcu, nec suscipit sapien pharetra nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent dignissim faucibus pharetra. Suspendisse potenti. Nunc ultrices nisi nec purus tincidunt, sit amet scelerisque ipsum lobortis. Quisque laoreet mollis finibus. Vivamus at imperdiet justo.",
      likes: 2,
      dislikes: 1,
      user_id: 1
    },
    {
      id: 2,
      title: "Test How-To #2",
      summary:
        "Nam interdum non diam ac dapibus. Donec rhoncus, nunc vitae pulvinar venenatis, diam mauris ultrices lacus, consequat accumsan metus purus ac leo.",
      content:
        "Nam interdum non diam ac dapibus. Donec rhoncus, nunc vitae pulvinar venenatis, diam mauris ultrices lacus, consequat accumsan metus purus ac leo. Nulla quis metus porta, mattis ipsum non, tincidunt sapien. Phasellus quis quam eu nisi ultrices imperdiet id a nisi. Mauris rutrum ullamcorper quam in bibendum. Quisque varius leo vitae elit egestas ornare. Donec mauris ex, varius eu dapibus id, pellentesque et nibh. Donec blandit venenatis lectus, ut pretium mauris mattis ac. Etiam nec lacus in nibh efficitur aliquam ac malesuada sapien. Nullam efficitur, libero vitae tempus malesuada, sem leo mattis lectus, et sodales justo augue quis libero. In ultricies ligula eu libero efficitur, at eleifend leo rutrum. Vestibulum tincidunt sapien et ligula maximus convallis. Quisque eget fermentum metus. Fusce rutrum augue quis pulvinar tempor.",
      likes: 2,
      dislikes: 1,
      user_id: 3
    },
    {
      id: 3,
      title: "Test How-To #3",
      summary:
        "Nullam suscipit tristique dolor, sit amet tempus enim molestie scelerisque. Suspendisse potenti. Quisque molestie, nulla vitae sollicitudin dapibus, metus lorem vulputate velit, quis finibus augue leo vitae libero.",
      content:
        "Nullam suscipit tristique dolor, sit amet tempus enim molestie scelerisque. Suspendisse potenti. Quisque molestie, nulla vitae sollicitudin dapibus, metus lorem vulputate velit, quis finibus augue leo vitae libero. Proin non urna id turpis mollis posuere. Ut luctus urna et euismod tristique. Duis ut scelerisque ligula. Aliquam sem ante, iaculis eu malesuada vitae, iaculis sed magna. Etiam interdum molestie libero sed placerat. Aliquam erat volutpat. Integer non rhoncus augue. Nullam vel nisl sed massa tincidunt sagittis ut a purus. Vestibulum rhoncus iaculis venenatis. Pellentesque mollis eget mauris et varius.",
      likes: 1,
      dislikes: 2,
      user_id: 2
    },
    {
      id: 4,
      title: "Test How-To #4",
      summary:
        "Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sed lectus vel ligula eleifend luctus. Integer ultricies tincidunt varius.",
      content:
        "Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sed lectus vel ligula eleifend luctus. Integer ultricies tincidunt varius. Etiam scelerisque neque vel libero pretium, quis lacinia arcu porta. Fusce euismod enim arcu, sit amet fringilla elit porttitor vitae. Etiam dignissim, eros ac consequat fermentum, ante libero imperdiet odio, id convallis purus justo vel enim. Cras lacinia massa sit amet nulla aliquet, at tincidunt massa efficitur. Praesent placerat eros id tellus facilisis sollicitudin. Duis sagittis, ligula quis tincidunt maximus, arcu ex convallis ipsum, ut suscipit eros nisi a diam. Nunc rhoncus eros et nunc vehicula gravida. Maecenas sed imperdiet orci, vitae scelerisque leo. Nullam nec eros ex. Proin eget arcu a lacus accumsan pellentesque. Nullam ut felis tortor.",
      likes: 3,
      dislikes: 0,
      user_id: 4
    }
  ]);
};
